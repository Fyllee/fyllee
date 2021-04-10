interface Config {
  maxUploadSizePerFile: number;
}

export default (): Config => ({
  maxUploadSizePerFile: 1_250_000, // 10 MB
});
