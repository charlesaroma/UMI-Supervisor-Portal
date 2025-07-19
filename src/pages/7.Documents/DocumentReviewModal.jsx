import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useUploadReviewedDocument } from '../../store/tanstackStore/services/queries';

const DocumentReviewModal = ({ isOpen, onClose, document, student }) => {
  const [reviewComments, setReviewComments] = useState('');
  const [reviewedFile, setReviewedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadReviewedMutation = useUploadReviewedDocument();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Please select a valid file type (PDF, DOC, or DOCX)');
        return;
      }

      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      setReviewedFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewedFile) {
      toast.error('Please upload a reviewed document');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('file', reviewedFile);
      formData.append('reviewComments', reviewComments);

      await uploadReviewedMutation.mutateAsync({
        documentId: document.id,
        formData
      });

      toast.success('Reviewed document uploaded successfully!');
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload reviewed document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReviewComments('');
    setReviewedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Review Document</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Document Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Document Information</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Title:</span> {document.title}
              </div>
              <div>
                <span className="font-medium">Type:</span> {document.type}
              </div>
              <div>
                <span className="font-medium">Student:</span> {student.firstName} {student.lastName}
              </div>
              <div>
                <span className="font-medium">Uploaded:</span> {new Date(document.uploadedAt).toLocaleDateString()}
              </div>
              {document.description && (
                <div>
                  <span className="font-medium">Description:</span> {document.description}
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Review Comments */}
            <div>
              <label htmlFor="reviewComments" className="block text-sm font-medium text-gray-700 mb-1">
                Review Comments
              </label>
              <textarea
                id="reviewComments"
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide feedback and comments on the document..."
              />
            </div>

            {/* Upload Reviewed Document */}
            <div>
              <label htmlFor="reviewedFile" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Reviewed Document *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-14 w-14 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="reviewedFile"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="reviewedFile"
                        name="reviewedFile"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
              {reviewedFile && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: {reviewedFile.name} ({(reviewedFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !reviewedFile}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Uploading...' : 'Upload Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentReviewModal; 