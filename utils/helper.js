const processData = (data, fileBase64) => {
  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;
  let isPrimeFound = false;

  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(Number(item))) {
        isPrimeFound = true;
      }
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (/[a-z]/.test(item)) {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  const { file_valid, file_mime_type, file_size_kb } = extractFileDetails(fileBase64);

  return {
    is_success: true,
    user_id: "vinayak_malviya_21112002", 
    email: "vinayakmalviya21@gmail.com", 
    roll_number: "0101IT211065",
    numbers,
    alphabets,
    highestLowercaseAlphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: isPrimeFound,
    file_valid,
    file_mime_type,
    file_size_kb,
  };
};

const extractFileDetails = (fileBase64) => {
  const isBase64 = (str) => {
    const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
    return base64Regex.test(str);
  };

  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKb = null;

  if (fileBase64 && isBase64(fileBase64)) {
    try {
      const buffer = Buffer.from(fileBase64, "base64");

      fileSizeKb = (buffer.length / 1024).toFixed(2);

      const fileSignature = buffer.toString("hex", 0, 4).toUpperCase();
      const mimeTypes = {
        "89504E47": "image/png",
        "FFD8FFDB": "image/jpeg",
        "FFD8FFE0": "image/jpeg",
        "FFD8FFE1": "image/jpeg",
        "25504446": "application/pdf",
        "504B0304": "application/zip",
      };

      fileMimeType = mimeTypes[fileSignature] || "application/octet-stream";

      fileValid = true;
    } catch (error) {
      fileValid = false;
      fileMimeType = null;
      fileSizeKb = null;
    }
  }

  return {
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  };
};

module.exports = { processData };
