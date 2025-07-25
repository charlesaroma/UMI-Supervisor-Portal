import React, { useState, useCallback, memo, useMemo } from "react";
import { Icon } from "@iconify-icon/react";


import { toast } from "sonner";
//addPanelistsService to be removed
//addReviewersService to be removed
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  useGetStudentProposals } from "../../store/tanstackStore/services/queries";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useParams } from "react-router-dom";
import { queryClient } from "../../utils/tanstack";
import { debounce } from 'lodash';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
// 1. Memoize the search components
const SearchInput = memo(({ value, onChange, placeholder }) => (
  <Input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
));


const getCategoryStyle = (status) => {
  switch (status) {
    case 'PASSED':
      return 'w-max text-[#15803D] bg-[#DCFCE7] border border-[#15803D] rounded-md px-2 py-1 text-xs font-medium';
    case 'FAILED':
      return 'w-max text-[#DC2626] bg-[#FEE2E2] border border-[#DC2626] rounded-md px-2 py-1 text-xs font-medium';
    case 'NOT GRADED':
      return 'w-max text-[#6B7280] bg-[#F3F4F6] border border-[#6B7280] rounded-md px-2 py-1 text-xs font-medium';
    default:
      return 'w-max px-2 py-1';
  }
};

const StudentProfileProgressProposalDrawer = ({ isOpen, onClose,   proposalData }) => {
let {id:studentId} = useParams();
let navigate = useNavigate();
const { data: proposals, isLoading: isLoadingProposals } = useGetStudentProposals(studentId);


console.log('proposals',proposals);
const proposal = useMemo(() => {
  if (!proposalData || !proposals?.proposals) return null;
  const foundProposal = proposals.proposals.find(p => p.id === proposalData?.id);
  return foundProposal || proposalData;
}, [proposalData, proposals]);

 

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="min-w-[600px] p-0">
          <SheetHeader className="p-4 border-b">
            <div className="flex justify-between items-center z-50">
              <SheetTitle>Proposal Details</SheetTitle>
              <Button  className="bg-primary-500 hover:bg-primary-800 text-white" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                Close Window
              </Button>
            </div>
          </SheetHeader>

          <div className="overflow-y-auto h-full p-6">
            {proposal ? (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <Label className="text-sm font-[Inter-Regular] text-gray-500">Title</Label>
                  <p className="text-gray-900 text-base font-[Inter-Regular]">{proposal.title}</p>
                </div>

                {/* Status */}
                <div>
                  <Label className="text-sm font-[Inter-Regular] text-gray-500 ">Status</Label>
                  {proposal.statuses?.length > 0 && (
                    <span
                      style={{
                        color: proposal.statuses[proposal.statuses.length - 1]?.definition?.color || "#000",
                        backgroundColor: `${proposal.statuses[proposal.statuses.length - 1]?.definition?.color}18` || "#00000018",
                        border: `1px solid ${proposal.statuses[proposal.statuses.length - 1]?.definition?.color || "#000"}`,
                      }}
                      className="px-2 py-1 rounded-md text-sm font-[Inter-Regular] capitalize inline-block"
                    >
                      {proposal.statuses[proposal.statuses.length - 1]?.definition?.name?.toLowerCase() || "Pending"}
                    </span>
                  )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-[Inter-Regular] text-gray-500">Submitted Date</Label>
                    <p className="text-gray-900 text-base font-[Inter-Regular]">
                      {proposal.submittedAt ? format(new Date(proposal.submittedAt), 'PP') : "-"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-[Inter-Regular] text-gray-500">Defense Date</Label>
                    <p className="text-gray-900 text-base font-[Inter-Regular]">
                      {(() => {
                        const defenses = proposal.defenses || [];
                        const currentDefense = defenses.find(defense => defense.isCurrent);
                        
                        if (currentDefense && currentDefense.scheduledDate) {
                          return format(new Date(currentDefense.scheduledDate), 'PP');
                        } else if (proposal.defenseDate) {
                          return format(new Date(proposal.defenseDate), 'PP');
                        }
                        return "-";
                      })()}
                    </p>
                  </div>
                </div>

                {/* Submitted By */}
                <div>
                  <Label className="text-sm font-[Inter-Regular] text-gray-500">Submitted By</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 text-base font-[Inter-Regular]">{proposal.submittedBy?.name}</span>
                    {proposal.submittedBy && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Icon icon="tdesign:info-circle-filled" className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>{proposal.submittedBy.email}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>

                {/* Grade */}
                <div className="flex flex-col gap-2 w-max">
                  <Label className="text-sm font-[Inter-Regular] text-gray-500">Verdict</Label>
                  {(() => {
                    const defenses = proposal.defenses || [];
                    const currentDefense = defenses.find(defense => defense.isCurrent);
                    
                    return (
                      <div className="flex flex-col">
                        {currentDefense && currentDefense.verdict ? (
                          <span className={getCategoryStyle(currentDefense.verdict)}>
                            {currentDefense.verdict}
                          </span>
                        ) : (
                          <span className={getCategoryStyle('NOT GRADED')}>
                            NOT GRADED
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Reviewers */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-[Inter-Regular] text-gray-500">Reviewers</Label>
                  </div>
                  <div className="space-y-2">
                    {proposal.reviewers?.length > 0 ? (
                      proposal.reviewers.map((reviewer) => (
                        <div key={reviewer.id} className="flex items-center gap-2">
                          <span className="text-gray-900 text-base font-[Inter-Regular]">{reviewer.name}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Icon icon="tdesign:info-circle-filled" className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>{reviewer.email}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm italic">No reviewers assigned</p>
                    )}
                  </div>
                </div>

                {/* Panelists */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-[Inter-Regular] text-gray-500">Panelists</Label>
                  </div>
                  <div className="space-y-2">
                    {(() => {
                      const defenses = proposal.defenses || [];
                      const currentDefense = defenses.find(defense => defense.isCurrent);
                      const panelists = currentDefense?.panelists || [];
                      
                      return panelists.length > 0 ? (
                        panelists.map((panelist) => (
                          <div key={panelist.id} className="flex items-center gap-2">
                            <span className="text-gray-900 text-base font-[Inter-Regular]">{panelist.name}</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Icon icon="tdesign:info-circle-filled" className="w-4 h-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>{panelist.email}</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm italic">No panelists assigned</p>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">No proposal selected</div>
            )}
            
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default memo(StudentProfileProgressProposalDrawer);