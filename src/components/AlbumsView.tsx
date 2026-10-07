'use client';

import React, { useState } from 'react';
import { 
  Images, 
  Plus, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  Heart, 
  Sparkles, 
  Link as LinkIcon, 
  Edit3, 
  X, 
  Eye, 
  Send,
  MessageSquare
} from 'lucide-react';
import { Album } from '../types';

interface AlbumsViewProps {
  albums: Album[];
  onUpdateAlbum?: (album: Album) => void;
}

export const AlbumsView: React.FC<AlbumsViewProps> = ({ albums: initialAlbums }) => {
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Custom link editing modal
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [customLinkInput, setCustomLinkInput] = useState('');

  // Interactive Photo Selector Client Preview Modal
  const [activeProofingAlbum, setActiveProofingAlbum] = useState<Album | null>(null);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<number[]>([1, 4, 7, 12]);
  const [filterMode, setFilterMode] = useState<'all' | 'selected'>('all');
  const [retouchNotes, setRetouchNotes] = useState<{ [key: number]: string }>({
    1: 'Làm sáng da tự nhiên, xóa nếp gấp váy',
    4: 'Xóa người đi ngang qua phía sau hậu cảnh'
  });
  const [activePhotoForNote, setActivePhotoForNote] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState('');

  // Generate 24 sample photo cards for interactive proofing
  const demoPhotos = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    code: `DSC_${String(1000 + i + 1).padStart(4, '0')}.JPG`,
    gradient: i % 4 === 0 
      ? 'linear-gradient(135deg, #2e1065 0%, #3b0764 100%)' 
      : i % 4 === 1 
      ? 'linear-gradient(135deg, #1e1b4b 0%, #172554 100%)' 
      : i % 4 === 2 
      ? 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)' 
      : 'linear-gradient(135deg, #3f3f46 0%, #18181b 100%)'
  }));

  const handleCopyLink = (album: Album) => {
    navigator.clipboard.writeText(album.shareLink);
    setCopiedId(album.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveCustomLink = () => {
    if (!editingAlbum) return;
    setAlbums(albums.map(a => a.id === editingAlbum.id ? { ...a, shareLink: customLinkInput } : a));
    setEditingAlbum(null);
  };

  const toggleSelectPhoto = (photoId: number) => {
    if (selectedPhotoIds.includes(photoId)) {
      setSelectedPhotoIds(selectedPhotoIds.filter(id => id !== photoId));
    } else {
      setSelectedPhotoIds([...selectedPhotoIds, photoId]);
    }
  };

  const handleSaveNote = () => {
    if (activePhotoForNote === null) return;
    setRetouchNotes({ ...retouchNotes, [activePhotoForNote]: noteInput });
    setActivePhotoForNote(null);
    setNoteInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>Quản lý album & Chọn ảnh trực tuyến</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Tạo album sau buổi chụp, tích hợp link web chọn ảnh của bạn hoặc dùng hệ thống chọn ảnh trực tuyến.
          </p>
        </div>

        <button className="btn-primary" onClick={() => alert('Đang tạo album mới...')}>
          <Plus size={16} strokeWidth={2.5} />
          <span>Tạo album mới</span>
        </button>
      </div>

      {/* Album Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {albums.map((album) => {
          const progressPercent = album.totalPhotos > 0 ? Math.round((album.selectedPhotos / album.totalPhotos) * 100) : 0;

          return (
            <div
              key={album.id}
              className="card-dark"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'relative'
              }}
            >
              {/* Fake Cover Banner */}
              <div style={{
                height: '140px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #1f1f2e 0%, #2a203b 50%, #151520 100%)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <Images size={42} color="rgba(139, 92, 246, 0.4)" />
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '11px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  fontWeight: 500
                }}>
                  {album.totalPhotos} ảnh gốc
                </span>

                {/* Quick test proofing button */}
                <button
                  onClick={() => setActiveProofingAlbum(album)}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(139, 92, 246, 0.85)',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
                  }}
                >
                  <Eye size={13} />
                  <span>Trang chọn ảnh của khách</span>
                </button>
              </div>

              {/* Album Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>{album.customerName}</h3>
                  <span className={`badge-status badge-${album.status}`}>
                    {album.status === 'cho_khach_chon' && 'Chờ khách chọn'}
                    {album.status === 'dang_retouch' && 'Đang retouch'}
                    {album.status === 'da_giao' && 'Đã giao ảnh'}
                  </span>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{album.service}</div>
              </div>

              {/* Custom Link Box (Matching user requirement) */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flex: 1 }}>
                  <LinkIcon size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span style={{
                    fontSize: '11.5px',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {album.shareLink}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  <button
                    onClick={() => {
                      setEditingAlbum(album);
                      setCustomLinkInput(album.shareLink);
                    }}
                    title="Gắn link web chọn ảnh riêng của bạn"
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.06)',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Edit3 size={12} />
                    <span>Đổi link</span>
                  </button>
                  <button
                    onClick={() => handleCopyLink(album)}
                    title="Copy link gửi cho khách"
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {copiedId === album.id ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedId === album.id ? 'Đã copy' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Tiến độ chọn ảnh:</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{album.selectedPhotos} / {album.totalPhotos} ảnh</span>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '9999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary-gradient)', borderRadius: '9999px' }} />
                </div>
              </div>

              {/* Deadline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '12px' }}>
                <Clock size={13} color="var(--primary)" />
                <span>Hạn giao ảnh: {album.deadlineDate}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Edit Custom Link (Gắn link web chọn ảnh riêng) */}
      {editingAlbum && (
        <div className="modal-overlay" onClick={() => setEditingAlbum(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Gắn link web chọn ảnh của bạn</h3>
              <button onClick={() => setEditingAlbum(null)} className="btn-ghost" style={{ padding: '4px' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Bạn có thể dán link web chọn ảnh riêng của bạn (hoặc link Google Drive, Pixieset, trang chọn ảnh riêng) vào đây để studio tự đồng bộ link này gửi cho khách.
              </p>
              <div>
                <label style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Đường dẫn (URL) chọn ảnh:
                </label>
                <input
                  type="text"
                  value={customLinkInput}
                  onChange={e => setCustomLinkInput(e.target.value)}
                  placeholder="https://chonanh.yourdomain.com/album/123"
                  className="input-dark"
                  style={{ padding: '10px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => setEditingAlbum(null)} className="btn-secondary">Hủy</button>
                <button onClick={handleSaveCustomLink} className="btn-primary">Lưu đường dẫn</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Photo Selection Client Portal Modal */}
      {activeProofingAlbum && (
        <div className="modal-overlay" onClick={() => setActiveProofingAlbum(null)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '1040px',
              height: '90vh',
              display: 'flex',
              flexDirection: 'column',
              background: '#0d0d12'
            }}
          >
            {/* Proofing Portal Header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#121217',
              flexShrink: 0
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                    TRANG KHÁCH CHỌN ẢNH
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                    {activeProofingAlbum.customerName}
                  </h3>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {activeProofingAlbum.service} • Hạn chốt: {activeProofingAlbum.deadlineDate}
                </div>
              </div>

              {/* Center filter */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setFilterMode('all')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: filterMode === 'all' ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
                    color: filterMode === 'all' ? '#fff' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Tất cả ({demoPhotos.length})
                </button>
                <button
                  onClick={() => setFilterMode('selected')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: filterMode === 'selected' ? 'rgba(236, 72, 153, 0.25)' : 'rgba(255,255,255,0.04)',
                    color: filterMode === 'selected' ? '#f472b6' : 'var(--text-secondary)',
                    border: filterMode === 'selected' ? '1px solid #f472b6' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Heart size={13} fill={filterMode === 'selected' ? '#f472b6' : 'none'} />
                  <span>Đã chọn ({selectedPhotoIds.length})</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => {
                    const selectedCodes = demoPhotos.filter(p => selectedPhotoIds.includes(p.id)).map(p => p.code).join(', ');
                    navigator.clipboard.writeText(`Danh sách ảnh đã chọn (${selectedPhotoIds.length} ảnh): ${selectedCodes}`);
                    alert(`Đã sao chép mã ${selectedPhotoIds.length} ảnh đã chọn vào Clipboard để gửi cho Studio!`);
                  }}
                  className="btn-primary"
                  style={{ fontSize: '12.5px', padding: '6px 14px' }}
                >
                  <Send size={13} />
                  <span>Gửi {selectedPhotoIds.length} ảnh đã chọn</span>
                </button>
                <button onClick={() => setActiveProofingAlbum(null)} className="btn-ghost" style={{ padding: '6px' }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Photos Grid Content */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '16px'
            }}>
              {demoPhotos
                .filter(p => filterMode === 'all' || selectedPhotoIds.includes(p.id))
                .map((photo) => {
                  const isSelected = selectedPhotoIds.includes(photo.id);
                  const hasNote = !!retouchNotes[photo.id];

                  return (
                    <div
                      key={photo.id}
                      style={{
                        position: 'relative',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        background: '#181822',
                        border: isSelected ? '2px solid #ec4899' : '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      {/* Photo Thumbnail */}
                      <div
                        onClick={() => toggleSelectPhoto(photo.id)}
                        style={{
                          height: '140px',
                          background: photo.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <Images size={28} color="rgba(255,255,255,0.3)" />

                        {/* Heart Select Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelectPhoto(photo.id);
                          }}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: isSelected ? '#ec4899' : 'rgba(0,0,0,0.5)',
                            border: 'none',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
                          }}
                        >
                          <Heart size={15} fill={isSelected ? '#fff' : 'none'} />
                        </button>
                      </div>

                      {/* Photo Footer Details */}
                      <div style={{
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        background: '#13131a'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#fff' }}>{photo.code}</span>
                          <button
                            onClick={() => {
                              setActivePhotoForNote(photo.id);
                              setNoteInput(retouchNotes[photo.id] || '');
                            }}
                            title="Ghi chú chỉnh sửa cho thợ retouch"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: hasNote ? 'var(--primary)' : 'var(--text-dim)',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <MessageSquare size={13} />
                          </button>
                        </div>

                        {hasNote && (
                          <div style={{ fontSize: '10.5px', color: 'var(--primary)', fontStyle: 'italic', lineHeight: 1.2 }}>
                            {retouchNotes[photo.id]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Note input popup */}
      {activePhotoForNote !== null && (
        <div className="modal-overlay" onClick={() => setActivePhotoForNote(null)} style={{ zIndex: 1100 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', color: '#fff', fontWeight: 600 }}>Ghi chú retouch ảnh</h4>
              <button onClick={() => setActivePhotoForNote(null)} className="btn-ghost" style={{ padding: '2px' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <textarea
                rows={3}
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                placeholder="VD: Xóa vết thâm, bóp eo nhẹ, tăng độ tương phản..."
                className="input-dark"
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button onClick={() => setActivePhotoForNote(null)} className="btn-secondary">Hủy</button>
                <button onClick={handleSaveNote} className="btn-primary">Lưu ghi chú</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
