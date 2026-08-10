import React, { useEffect, useState } from 'react';
import { FaTrash, FaCheckDouble, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/common/Pagination';
import { deleteMessage, fetchMessageById, fetchMessages, markMessageReplied } from '../../api/messages';
import { formatDate } from '../../utils/formatters';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = (targetPage = page) => {
    setLoading(true);
    fetchMessages({ page: targetPage, limit: 15 })
      .then((res) => {
        setMessages(res.data);
        setPagination(res.pagination);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const openMessage = async (id) => {
    const res = await fetchMessageById(id);
    setSelected(res.data);
    load(page);
  };

  const handleReplied = async (id) => {
    await markMessageReplied(id);
    if (selected?._id === id) setSelected((prev) => ({ ...prev, isReplied: true }));
    load(page);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await deleteMessage(id);
    if (selected?._id === id) setSelected(null);
    load(page);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark">Messages</h1>
      <p className="mt-1 text-sm text-brand-gray">Customer inquiries submitted through the contact form.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          {loading ? (
            <Loader />
          ) : messages.length === 0 ? (
            <EmptyState title="No messages yet" description="Customer messages will appear here." />
          ) : (
            <div className="card divide-y divide-gray-100 overflow-hidden">
              {messages.map((message) => (
                <button
                  key={message._id}
                  type="button"
                  onClick={() => openMessage(message._id)}
                  className={`flex w-full items-start gap-3 px-5 py-4 text-left transition hover:bg-gray-50 ${
                    selected?._id === message._id ? 'bg-blue-50' : ''
                  }`}
                >
                  <span className={message.isRead ? 'mt-1 text-brand-gray' : 'mt-1 text-brand-blue'}>
                    {message.isRead ? <FaEnvelopeOpen /> : <FaEnvelope />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`truncate text-sm ${message.isRead ? 'font-medium' : 'font-bold'} text-brand-dark`}>
                        {message.name}
                      </p>
                      <span className="shrink-0 text-xs text-brand-gray">{formatDate(message.createdAt)}</span>
                    </div>
                    <p className="truncate text-xs text-brand-gray">{message.subject}</p>
                    {message.isReplied && <span className="mt-1 inline-block text-xs font-semibold text-brand-green">Replied</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
          <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-brand-dark">{selected.subject}</h2>
                  <p className="mt-1 text-sm text-brand-gray">
                    {selected.name} &middot; {selected.email} {selected.phone && `· ${selected.phone}`}
                  </p>
                  <p className="mt-1 text-xs text-brand-gray">{formatDate(selected.createdAt)}</p>
                </div>
                <div className="flex gap-3">
                  {!selected.isReplied && (
                    <button
                      type="button"
                      onClick={() => handleReplied(selected._id)}
                      className="text-brand-green hover:text-green-700"
                      title="Mark as replied"
                    >
                      <FaCheckDouble />
                    </button>
                  )}
                  <button type="button" onClick={() => handleDelete(selected._id)} className="text-red-500 hover:text-red-700" title="Delete">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-brand-dark">{selected.message}</p>
              <a href={`mailto:${selected.email}`} className="btn-secondary mt-6 inline-flex">
                Reply via Email
              </a>
            </div>
          ) : (
            <div className="card flex h-full min-h-[300px] items-center justify-center p-6 text-sm text-brand-gray">
              Select a message to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
