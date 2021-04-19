import MimeType from 'mime-type';

export default new MimeType({
  'audio/aac': { extensions: ['aac'], source: 'apache' },
  'audio/flac': { extensions: ['flac'], source: 'apache' },
  'audio/mp3': { extensions: ['mp3'], source: 'iana' },
  'audio/wav': { extensions: ['wav'], source: 'apache' },

  'image/gif': { extensions: ['gif'], source: 'iana' },
  'image/jpeg': { extensions: ['jpeg', 'jpg'], source: 'iana' },
  'image/png': { extensions: ['png'], source: 'iana' },
  'image/svg+xml': { extensions: ['svg'], source: 'iana' },
  'image/webp': { extensions: ['webp'], source: 'apache' },

  'video/mp4': { extensions: ['mp4'], source: 'iana' },
  'video/mpeg': { extensions: ['mpeg'], source: 'iana' },
  'video/ogg': { extensions: ['ogv'], source: 'iana' },
  'video/quicktime': { extensions: ['mov'], source: 'iana' },
  'video/webm': { extensions: ['webm'], source: 'apache' },
  'video/x-matroska': { extensions: ['mkv'], source: 'apache' },
  'video/x-msvideo': { extensions: ['avi'], source: 'apache' },
}, 0);
