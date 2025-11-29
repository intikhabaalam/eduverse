// UI Only — Comment list component

import { formatDate, formatTimeAgo, getInitials } from '../utils/format';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="flex space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(comment.user.name)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-sm font-semibold text-slate-900">{comment.user.name}</p>
              <span className="text-xs text-slate-500">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-sm text-slate-700">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
