import MimeType from 'mime-type';

export default new MimeType({
  'audio/mp3': {
    extensions: ['mp3'],
    source: 'iana',
  },
  'audio/flac': {
    extensions: ['flac'],
    source: 'apache',
  },
  'audio/aac': {
    extensions: ['aac'],
    source: 'apache',
  },
  'audio/wav': {
    extensions: ['wav'],
    source: 'apache',
  },
  'video/mpeg': {
    extensions: ['mpeg'],
    source: 'iana',
  },
  'video/mp4': {
    extensions: ['mp4'],
    source: 'iana',
  },
  'video/x-msvideo': {
    extensions: ['avi'],
    source: 'apache',
  },
  'video/quicktime': {
    extensions: ['mov'],
    source: 'iana',
  },
  'video/ogg': {
    extensions: ['ogv'],
    source: 'iana',
  },
  'video/x-matroska': {
    extensions: ['mkv'],
    source: 'apache',
  },
  'video/webm': {
    extensions: ['webm'],
    source: 'apache',
  },
  'image/png': {
    extensions: ['png'],
    source: 'iana',
  },
  'image/jpeg': {
    extensions: ['jpeg', 'jpg'],
    source: 'iana',
  },
  'image/gif': {
    extensions: ['gif'],
    source: 'iana',
  },
  'image/webp': {
    extensions: ['webp'],
    source: 'apache',
  },
  'image/svg+xml': {
    extensions: ['svg'],
    source: 'iana',
  },
}, 0);
