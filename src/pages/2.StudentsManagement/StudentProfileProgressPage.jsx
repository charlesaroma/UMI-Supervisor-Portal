import React, { useState, useMemo, useCallback } from "react";

import { X } from "lucide-react";
import {
  useGetStudentStatuses,
  useGetStudentProposals,
} from "@/store/tanstackStore/services/queries";
import { Icon } from "@iconify-icon/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StudentProfileProgressStatusTable from "./StudentProfileProgressStatusTable.jsx";
import StudentProfileProgressProposalTable from "./StudentProfileProgressProposalTable.jsx";
import StudentProfileProgressStatusDrawer from "./StudentProfileProgressStatusDrawer.jsx";
import StudentProfileProgressProposalDrawer from "./StudentProfileProgressProposalDrawer.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStudentBooks } from "../../store/tanstackStore/services/queries.js";
import StudentProfileProgressBookTable from "./StudentProfileProgressBookTable.jsx";
import StudentProfileProgressBookDrawer from "./StudentProfileProgressBookDrawer.jsx";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const StudentProfileProgressPage = ({ studentData }) => {
    const [activeView, setActiveView] = useState("tracker");
    const [isStatusDrawerOpen, setIsStatusDrawerOpen] = useState(false);
    const [isProposalDrawerOpen, setIsProposalDrawerOpen] = useState(false);
    const [isBookDrawerOpen, setIsBookDrawerOpen] = useState(false);
    const [isSupervisorDrawerOpen, setIsSupervisorDrawerOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);
    const { id } = useParams();
    let navigate = useNavigate();
  
    const [resultsApprovedDate, setResultsApprovedDate] = useState(
      studentData?.student?.resultsApprovedDate || ""
    );
    const [resultsSentDate, setResultsSentDate] = useState(
      studentData?.student?.resultsSentDate || ""
    );
    const [senateApprovalDate, setSenateApprovalDate] = useState(
      studentData?.student?.senateApprovalDate || ""
    );
  
    const {
      data: studentStatuses,
      isLoading: isLoadingStudentStatuses,
    } = useGetStudentStatuses(id);
  
    const { data: proposals, isLoading: isLoadingProposals } = useGetStudentProposals(id);
  
    const { data: books, isLoading: isLoadingBooks } = useGetStudentBooks(id);
  
    const currentStatus = useMemo(
      () => studentData?.student?.statuses?.find((s) => s.isCurrent),
      [studentData?.student?.statuses]
    );
  
    const currentSupervisor = useMemo(
      () => studentData?.student?.supervisors,
      [studentData?.student?.supervisors]
    );
  
    const { totalDays, enrollmentDate, expectedDays } = useMemo(() => {
      const enrollmentDate = studentData?.student?.createdAt
        ? new Date(studentData?.student?.createdAt)
        : new Date();
      const totalDays = Math.ceil(
        (new Date() - enrollmentDate) / (1000 * 60 * 60 * 24)
      );
      const expectedDays = studentData?.student?.expectedCompletionDate
        ? Math.ceil(
            (new Date(studentData?.student?.expectedCompletionDate) -
              enrollmentDate) /
              (1000 * 60 * 60 * 24)
          )
        : null;
      return { totalDays, enrollmentDate, expectedDays };
    }, [
      studentData?.student?.createdAt,
      studentData?.student?.expectedCompletionDate,
    ]);
  
    const handleViewChange = useCallback((view) => {
      setActiveView(view);
    }, []);
  
    const formatDate = (dateString) => {
      if (!dateString) return "Not set";
      try {
        return new Date(dateString).toLocaleDateString('en-UG', { month: 'short', day: 'numeric', year: 'numeric' });
      } catch (error) {
        return "Invalid date";
      }
    };
  
    const renderTimelineBar = useCallback(
      (status, index) => {
        const startDate = new Date(status.startDate);
        const endDate =
          index < studentData.student.statuses.length - 1
            ? new Date(studentData.student.statuses[index + 1].startDate)
            : new Date();
        const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const position = Math.ceil(
          (startDate - enrollmentDate) / (1000 * 60 * 60 * 24)
        );
  
        return (
          <TooltipProvider key={status.id} className="z-[9999] h-full">
            <Tooltip className="z-[9999] h-full">
              <TooltipTrigger className="z-[9999] h-full relative">
                <div
                  key={status.id}
                  className="h-full group cursor-pointer hover:brightness-90 transition-all"
                  style={{
                    width: `${duration * 2}px`,
                    left: `${position * 2}px`,
                    backgroundColor: status?.definition?.color || "#313132",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                    borderRadius: "2px"
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">
                    {status?.definition?.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(status?.startDate).toLocaleDateString()} - {" "}
                    {index < studentData?.student?.statuses?.length - 1
                      ? new Date(
                          studentData?.student?.statuses[index + 1]?.startDate
                        ).toLocaleDateString()
                      : "Present"}
                  </div>
                  <div className="text-xs font-[Inter-Regular] text-gray-900">
                    Actual Duration: {duration} days
                  </div>
                  {status?.definition?.expectedDays && (
                    <div className="text-sm font-[Inter-Regular] text-gray-900">
                      Expected Duration: {status.definition.expectedDays} days
                      {duration > status.definition.expectedDays && (
                        <span className="text-red-500 ml-1">
                          (Overdue by {duration - status.definition.expectedDays} days)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      [enrollmentDate, studentData?.student?.statuses?.length]
    );
  
    const renderTimelineLegend = useCallback(
      (status) => {
        // Check if this status definition has already been rendered
        const isFirstOccurrence = studentData.student.statuses.findIndex(
          s => s.definition?.name === status.definition?.name
        ) === studentData.student.statuses.indexOf(status);
  
        if (!isFirstOccurrence) return null;
  
        return (
          <div key={status.id} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md shadow-sm">
            <div
              className="w-3 h-3 rounded-[4px] flex-shrink-0"
              style={{
                backgroundColor: status.definition?.color || "#313132",
              }}
            />
            <span className="text-xs font-[Inter-Medium] text-[#626263] capitalize whitespace-nowrap">
              {status.definition?.name || "Unknown"}
            </span>
          </div>
        );
      },
      [studentData?.student?.statuses]
    );
  
    const handleViewSupervisor = (supervisor) => {
      setSelectedSupervisor(supervisor);
      setIsSupervisorDrawerOpen(true);
    };
  
    const handleChangeSupervisor = (supervisor) => {
      navigate(`/students/change-supervisor/${id}?supervisorId=${supervisor.id}`);
    };
  
      // TanStack Table for Supervisors
      const columnHelper = createColumnHelper();
  
      const supervisorColumns = [
        columnHelper.accessor("name", {
          header: "Name",
          cell: (info) => (
            <span className="text-sm font-[Inter-Regular] text-gray-900">
              {info.row.original.title} {info.getValue()}
            </span>
          ),
        }),
        columnHelper.accessor("workEmail", {
          header: "Email",
          cell: (info) => (
            <span className="text-sm font-[Inter-Regular] text-gray-900">
              {info.getValue() || "N/A"}
            </span>
          ),
        }),
        columnHelper.accessor("primaryPhone", {
          header: "Phone",
          cell: (info) => (
            <span className="text-sm font-[Inter-Regular] text-gray-900">
              {info.getValue() || "N/A"}
            </span>
          ),
        }),
       
        columnHelper.accessor("id", {
          header: "Actions",
          cell: (info) => {
            const supervisor = info.row.original;
            return (
              <div className="flex flex-col gap-2 max-w-[150px] ">
                <button
                  className="px-2 py-1 text-xs font-[Inter-Medium]  text-white bg-accent2-600 rounded hover:bg-accent2-700 flex items-center"
                  onClick={() => handleViewSupervisor(supervisor)}
                >
                  <Icon icon="tabler:eye" className="h-3 w-3 mr-1" />
                  View Supervisor
                </button>
                {!supervisor.isCurrent && (
                  <button
                    className="px-2 py-1 text-xs font-[Inter-Medium] text-white bg-primary-600 rounded hover:bg-primary-700 flex items-center"
                    onClick={() => handleChangeSupervisor(supervisor)}
                  >
                    <Icon icon="tabler:refresh" className="h-3 w-3 mr-1" />
                    Change Supervisor
                  </button>
                )}
              </div>
            );
          },
        }),
      ];
  
      const supervisorsData = studentData?.student?.supervisors || [];
  
      const supervisorsTable = useReactTable({
        data: supervisorsData,
        columns: supervisorColumns,
        getCoreRowModel: getCoreRowModel(),
      });
  
  
    if (isLoadingStudentStatuses) {
      return <div>Loading...</div>;
    }
  
    if (!studentData) {
      return <div>Student not found</div>;
    }
  return (
    <div className="space-y-6 ">
    {/* Section 1: Student Information Details */}
    <div className="grid grid-cols-3 gap-x-16 gap-y-4">
   
      {/** status */}
      <div>
        <h3 className="text-sm font-[Inter-Regular] text-[#626263] mb-1">
          Current Status
        </h3>
        <span
          style={{
            color: currentStatus?.definition?.color || "#6B7280",
            backgroundColor:
              `${currentStatus?.definition?.color}18` || "#F3F4F6",
            border: `1px solid ${
              currentStatus?.definition?.color || "#6B7280"
            }`,
          }}
          className="inline-flex px-2 py-0.5 rounded-[4px] text-sm font-[Inter-Regular] capitalize"
        >
          {currentStatus?.definition?.name || "Unknown"}
        </span>
      </div>
      {/** time */}
      <div>
        <h3 className="text-sm font-[Inter-Regular] text-[#626263] mb-1">
          Total Time
        </h3>
        <span className="text-sm font-[Inter-Regular] text-gray-900">
          {totalDays} {expectedDays && `of ${expectedDays} days`}
        </span>
      </div>
      {/** results approved */}
      <div>
        <h3 className="text-sm font-[Inter-Regular] text-[#626263] mb-1">
          Results Approved
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-[Inter-Regular] text-gray-900">
            {formatDate(resultsApprovedDate)}
          </span>
        </div>
      </div>

      {/** results sent to schools */}
      <div>
        <h3 className="text-sm font-[Inter-Regular] text-[#626263] mb-1">
          Results Sent to School
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-[Inter-Regular] text-gray-900">
            {formatDate(resultsSentDate)}
          </span>
        </div>
      </div>

      {/** senate approval */}
      <div>
        <h3 className="text-sm font-[Inter-Regular] text-[#626263] mb-1">
          Senate Approval
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-[Inter-Regular] text-gray-900">
            {formatDate(senateApprovalDate)}
          </span>
        </div>
      </div>
    </div>

    {/* Section 2: Timeline */}
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-[Inter-Regular] text-gray-500 mb-4">
        Timeline (Days)
      </h3>

      <div className="flex flex-col ">
        {/* Expected Completion Date Indicator */}
        {studentData?.student?.expectedCompletionDate && (
          <div className="relative h-6 mb-1">
            <div
              className="absolute h-6 border-l-2 border-red-500 border-dashed"
              style={{
                left: "100%",
              }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="absolute -left-[6px] top-0 w-3 h-3 bg-red-500 rounded-full" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      Expected Completion Date:{" "}
                      {new Date(
                        studentData.student.expectedCompletionDate
                      ).toLocaleDateString()}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}

        {/* Timeline Progress Bar */}
        <div className="space-y-2">
          <div className="relative h-8 bg-white shadow-md flex gap-1">
            {studentData.student?.statuses?.map((status, index) =>
              renderTimelineBar(status, index)
            )}
          </div>
        </div>
        {/* Timeline Legend */}
        <div className="flex flex-wrap items-center gap-3 mt-4 p-3 bg-white rounded-lg shadow-sm">
          {studentData.student?.statuses?.map(renderTimelineLegend)}
        </div>
      </div>
    </div>



    {/* Section 3: Status Action Tracker and Proposal Table and Book Table */}
    <div className="bg-white rounded-lg py-2 space-y-4">
      {/* Options */}
      <div className="flex gap-4 px-4 pt-4">
        <button
          onClick={() => handleViewChange("tracker")}
          className={`text-sm font-[Inter-Medium] border py-1 px-2 rounded-lg cursor-pointer select-none ${
            activeView === "tracker"
              ? "border-secondary-800 bg-secondary-100  text-primary-800"
              : "border-secondary-700 bg-white text-secondary-800"
          }`}
        >
          Status Action Tracker
        </button>

        <button
          onClick={() => handleViewChange("proposal")}
          className={`text-sm font-[Inter-Medium] border py-1 px-2 rounded-lg cursor-pointer select-none ${
            activeView === "proposal"
              ? "border-secondary-800 bg-secondary-100  text-primary-900"
              : "border-secondary-700 bg-white text-secondary-800"
          }`}
        >
          Proposal
        </button>

        <button
          onClick={() => handleViewChange("book")}
          className={`text-sm font-[Inter-Medium] border py-1 px-2 rounded-lg cursor-pointer select-none ${
            activeView === "book"
              ? "border-secondary-800 bg-secondary-100  text-primary-900"
              : "border-secondary-700 bg-white text-secondary-800"
          }`}
        >
          Dissertation 
        </button>
      </div>

      {/* Content */}
      {/* Status Tracker Table */}
      {activeView === "tracker" && (
        <div className="px-4">
          <StudentProfileProgressStatusTable
            statuses={studentStatuses?.statuses || []}
            isLoading={isLoadingStudentStatuses}
            setIsStatusDrawerOpen={setIsStatusDrawerOpen}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
      )}

      {/* Grading Progress Table */}
      {activeView === "proposal" && (
        <StudentProfileProgressProposalTable
          setIsStatusDrawerOpen={setIsProposalDrawerOpen}
          setSelectedStatus={setSelectedProposal}
          studentId={studentData?.student?.id}
          proposals={proposals?.proposals || []}
          isLoadingProposals={isLoadingProposals}
        />
      )}

        {/* Grading Progress Table */}
        {activeView === "book" && (
        <StudentProfileProgressBookTable
          setIsStatusDrawerOpen={setIsBookDrawerOpen}
          setSelectedStatus={setSelectedBook}
          studentId={studentData?.student?.id}
          books={books?.books || []}  
          isLoadingBooks={isLoadingBooks}
        />
      )}
    </div>

    {isStatusDrawerOpen && (
      <StudentProfileProgressStatusDrawer
        isOpen={isStatusDrawerOpen}
        onClose={() => setIsStatusDrawerOpen(false)}
        studentId={studentData?.student?.id}
        studentData={studentData?.student}
        selectedStatus={selectedStatus}
      />
    )}

    {isProposalDrawerOpen && (
      <StudentProfileProgressProposalDrawer
        isOpen={isProposalDrawerOpen}
        onClose={() => setIsProposalDrawerOpen(false)}
        proposalData={selectedProposal}
      />
    )}

{isBookDrawerOpen && (
      <StudentProfileProgressBookDrawer
        isOpen={isBookDrawerOpen}
        onClose={() => setIsBookDrawerOpen(false)}
        bookData={selectedBook}
        studentData={studentData?.student}
      />
    )}

      {/* Supervisor Drawer */}
      {isSupervisorDrawerOpen && selectedSupervisor && (
      <div className="fixed inset-0  z-50 overflow-hidden">
        <div className="fixed inset-0 top-0 h-screen bg-black/30" onClick={() => setIsSupervisorDrawerOpen(false)} />
        <div className="fixed inset-y-0 right-0 flex max-w-full">
          <div className="w-screen max-w-md">
            <div className="flex h-full flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-[Inter-Bold] text-gray-900">Supervisor Details</h2>
                  <button
                     onClick={() => setIsSupervisorDrawerOpen(false)}
                      className="bg-primary-500 text-white rounded-lg hover:bg-primary-800 flex items-center justify-center whitespace-nowrap text-sm"
                      style={{ width: "148px", height: "36px", gap: "8px" }}
                    >
                     <X className="w-5 h-5" />
                      <span className="flex-shrink-0 text-sm">Close Window</span>
                    </button>
                
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-sm font-[Inter-Bold] text-gray-700 mb-3">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="text-sm font-[Inter-Medium]">
                          {selectedSupervisor.title} {selectedSupervisor.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="text-sm font-[Inter-Medium]">
                          {selectedSupervisor.isCurrent ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Current
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              Previous
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-sm font-[Inter-Bold] text-gray-700 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-[Inter-Medium]">{selectedSupervisor.workEmail || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-[Inter-Medium]">{selectedSupervisor.primaryPhone || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Alternative Phone</p>
                        <p className="text-sm font-[Inter-Medium]">{selectedSupervisor.alternativePhone || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div>
                    <h3 className="text-sm font-[Inter-Bold] text-gray-700 mb-3">Academic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Department</p>
                        <p className="text-sm font-[Inter-Medium]">{selectedSupervisor.department || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Specialization</p>
                        <p className="text-sm font-[Inter-Medium]">{selectedSupervisor.specialization || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedSupervisor.notes && (
                    <div>
                      <h3 className="text-sm font-[Inter-Bold] text-gray-700 mb-3">Notes</h3>
                      <p className="text-sm font-[Inter-Regular] bg-gray-50 p-3 rounded-md">
                        {selectedSupervisor.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex justify-center space-x-3">
                 
                 
                    <button
                      onClick={() => navigate(`/faculty/supervisor/profile/${selectedSupervisor?.id}`)}
                      className="px-4 py-2 text-sm font-[Inter-Medium] text-white bg-primary-600 rounded-md hover:bg-primary-700"
                    >
                      View More
                    </button>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default StudentProfileProgressPage