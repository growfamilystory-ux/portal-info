/**
 * Google Apps Script (Code.gs) & Standalone Single-File HTML generator.
 * Fully compatible with Google Sheets as Database and Google Drive for File Storage.
 */

export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * ============================================================================
 * PORTAL INFORMASI BPJS KESEHATAN RUMAH SAKIT
 * Backend Google Apps Script (Code.gs)
 * ============================================================================
 * Database: Google Sheets (11 Sheets: Settings, Admins, Information, Regulations, 
 *           Services, Officers, RegistrationChannels, FAQs, Documents, 
 *           Announcements, ActivityLogs)
 * Storage : Google Drive (Folder khusus Dokumen & Lampiran BPJS)
 * Timezone: Asia/Jakarta
 * Format ID: BPJS-YYYYMMDD-HHMMSS-XXX
 * ============================================================================
 */

// KONFIGURASI SPREADSHEET & DRIVE
// Ganti ID Spreadsheet dan ID Folder Google Drive di bawah ini:
const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet() ? SpreadsheetApp.getActiveSpreadsheet().getId() : "PASTE_YOUR_SPREADSHEET_ID_HERE";
const DRIVE_FOLDER_ID = "PASTE_YOUR_DRIVE_FOLDER_ID_HERE"; // Kosongkan jika ingin simpan di root Drive

const TIMEZONE = "Asia/Jakarta";

/**
 * Handle GET Requests
 * Parameter: ?action=getRegulations | ?action=getOfficers | ?action=getDashboardStats | dll.
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "getDashboardStats";
    let result = null;

    switch (action) {
      case "getSettings":
        result = getSettings();
        break;
      case "getRegulations":
        result = getSheetData("Regulations");
        break;
      case "getOfficers":
        result = getSheetData("Officers");
        break;
      case "getRegistrationChannels":
        result = getSheetData("RegistrationChannels");
        break;
      case "getServices":
        result = getSheetData("Services");
        break;
      case "getFAQs":
        result = getSheetData("FAQs");
        break;
      case "getDocuments":
        result = getSheetData("Documents");
        break;
      case "getAnnouncements":
        result = getSheetData("Announcements");
        break;
      case "getActivityLogs":
        result = getSheetData("ActivityLogs");
        break;
      case "getDashboardStats":
        result = getDashboardStats();
        break;
      case "getAllData":
        result = getAllData();
        break;
      case "initDatabase":
        result = initDatabase();
        break;
      default:
        return createJsonResponse(false, "Action tidak dikenali: " + action, null, "INVALID_ACTION");
    }

    return createJsonResponse(true, "Data berhasil diambil", result);
  } catch (err) {
    return createJsonResponse(false, "Terjadi kesalahan pada server GAS: " + err.toString(), null, err.toString());
  }
}

/**
 * Handle POST Requests
 * JSON body: { action: "saveRegulation", data: { ... }, user: "..." }
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse(false, "Tidak ada data payload yang dikirimkan", null, "EMPTY_PAYLOAD");
    }

    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    const data = payload.data;
    const user = payload.user || "Admin BPJS RS";

    let result = null;

    switch (action) {
      case "authenticateAdmin":
        result = authenticateAdmin(payload.username, payload.password);
        if (!result.success) {
          return createJsonResponse(false, result.message, null, "AUTH_FAILED");
        }
        return createJsonResponse(true, "Login berhasil", result);

      case "saveRegulation":
        result = saveData("Regulations", data, user);
        break;
      case "updateRegulation":
        result = updateData("Regulations", data.id, data, user);
        break;
      case "deleteRegulation":
        result = deleteData("Regulations", data.id, user);
        break;

      case "saveOfficer":
        result = saveData("Officers", data, user);
        break;
      case "updateOfficer":
        result = updateData("Officers", data.id, data, user);
        break;
      case "deleteOfficer":
        result = deleteData("Officers", data.id, user);
        break;

      case "saveChannel":
        result = saveData("RegistrationChannels", data, user);
        break;
      case "updateChannel":
        result = updateData("RegistrationChannels", data.id, data, user);
        break;
      case "deleteChannel":
        result = deleteData("RegistrationChannels", data.id, user);
        break;

      case "saveFAQ":
        result = saveData("FAQs", data, user);
        break;
      case "updateFAQ":
        result = updateData("FAQs", data.id, data, user);
        break;
      case "deleteFAQ":
        result = deleteData("FAQs", data.id, user);
        break;

      case "saveDocument":
        result = saveData("Documents", data, user);
        break;
      case "updateDocument":
        result = updateData("Documents", data.id, data, user);
        break;
      case "deleteDocument":
        result = deleteData("Documents", data.id, user);
        break;

      case "saveAnnouncement":
        result = saveData("Announcements", data, user);
        break;
      case "updateAnnouncement":
        result = updateData("Announcements", data.id, data, user);
        break;
      case "deleteAnnouncement":
        result = deleteData("Announcements", data.id, user);
        break;

      case "uploadFile":
        result = uploadFile(data.fileName, data.base64Data, data.mimeType, user);
        break;

      case "updateSettings":
        result = updateSettings(data, user);
        break;

      default:
        return createJsonResponse(false, "Action POST tidak dikenali: " + action, null, "INVALID_POST_ACTION");
    }

    return createJsonResponse(true, "Operasi berhasil", result);
  } catch (err) {
    return createJsonResponse(false, "Gagal memproses request POST: " + err.toString(), null, err.toString());
  }
}

/**
 * Buat JSON Response standar
 */
function createJsonResponse(success, message, data, error) {
  const output = {
    success: success,
    message: message || (success ? "Sukses" : "Gagal"),
    data: data || null,
    error: error || null,
    timestamp: getJakartaTimestamp()
  };
  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Generate Timestamp ID: BPJS-YYYYMMDD-HHMMSS-XXX
 */
function generateBpjsId(prefix) {
  prefix = prefix || "BPJS";
  const now = new Date();
  const dateFormatted = Utilities.formatDate(now, TIMEZONE, "yyyyMMdd-HHmmss");
  const randNum = ("000" + Math.floor(Math.random() * 1000)).slice(-3);
  return prefix + "-" + dateFormatted + "-" + randNum;
}

function getJakartaTimestamp() {
  return Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss") + " WIB";
}

/**
 * Mendapatkan Spreadsheet
 */
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

/**
 * Inisialisasi 11 Sheet jika belum ada
 */
function initDatabase() {
  const ss = getSpreadsheet();
  const sheetsConfig = {
    "Settings": ["key", "value", "updatedAt"],
    "Admins": ["id", "username", "passwordHash", "nama", "role", "status", "lastLogin"],
    "Information": ["id", "judul", "kategori", "ringkasan", "isi", "gambar", "lampiran", "sumber", "tanggalPublikasi", "tanggalPembaruan", "status", "urutan"],
    "Regulations": ["id", "judul", "nomor", "tahun", "jenisPeraturan", "instansiPenerbit", "tanggalTerbit", "tanggalBerlaku", "status", "ringkasan", "isi", "dasarHukum", "fileUrl", "linkSumberResmi", "catatan", "updatedAt"],
    "Services": ["id", "namaLayanan", "kategori", "deskripsi", "syarat", "dokumen", "lokasi", "catatanKhusus", "updatedAt"],
    "Officers": ["id", "nama", "foto", "jabatan", "unit", "lokasiPelayanan", "jamPelayanan", "hariPelayanan", "nomorKontak", "email", "jenisLayanan", "statusAktif"],
    "RegistrationChannels": ["id", "namaKanal", "deskripsi", "jenisKanal", "syarat", "langkah", "jamLayanan", "url", "nomorKontak", "status", "badge"],
    "FAQs": ["id", "pertanyaan", "jawaban", "kategori", "tags", "urutan", "status", "helpfulCount"],
    "Documents": ["id", "namaDokumen", "jenisDokumen", "nomorDokumen", "tahun", "kategori", "ukuran", "format", "tanggalUpload", "pengunggah", "fileUrl", "downloadCount", "status"],
    "Announcements": ["id", "judul", "kategori", "tanggal", "masaBerlaku", "ringkasan", "isi", "gambarUrl", "lampiranUrl", "status"],
    "ActivityLogs": ["id", "timestamp", "userName", "role", "action", "entity", "targetId", "details"]
  };

  const createdSheets = [];
  for (const sheetName in sheetsConfig) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(sheetsConfig[sheetName]);
      sheet.getRange(1, 1, 1, sheetsConfig[sheetName].length).setFontWeight("bold").setBackground("#006644").setFontColor("#FFFFFF");
      createdSheets.push(sheetName);
    }
  }

  logActivity("Sistem", "Super Admin", "CREATE", "Database", "ALL", "Inisialisasi sheet database selesai.");
  return { status: "Ready", initializedSheets: createdSheets };
}

/**
 * Mengambil semua baris dari sheet sebagai array of objects
 */
function getSheetData(sheetName) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const headers = values[0];
  const items = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      let val = row[j];
      // Parsing JSON arrays if stored as string
      if (typeof val === "string" && (val.startsWith("[") || val.startsWith("{"))) {
        try {
          val = JSON.parse(val);
        } catch (e) {
          // keep as string
        }
      }
      obj[headers[j]] = val;
    }
    items.push(obj);
  }

  return items;
}

/**
 * Menyimpan data baru ke sheet
 */
function saveData(sheetName, item, user) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    initDatabase();
    sheet = ss.getSheetByName(sheetName);
  }

  if (!item.id) {
    item.id = generateBpjsId(sheetName.substring(0, 4).toUpperCase());
  }
  if (!item.updatedAt) {
    item.updatedAt = getJakartaTimestamp();
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const rowData = [];

  for (let j = 0; j < headers.length; j++) {
    const key = headers[j];
    let val = item[key] !== undefined ? item[key] : "";
    if (typeof val === "object") {
      val = JSON.stringify(val);
    }
    rowData.push(val);
  }

  sheet.appendRow(rowData);
  logActivity(user, "Petugas BPJS", "CREATE", sheetName, item.id, "Menambah data " + (item.judul || item.nama || item.namaDokumen || item.pertanyaan || item.id));

  return item;
}

/**
 * Memperbarui data yang ada di sheet
 */
function updateData(sheetName, id, updatedItem, user) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error("Sheet tidak ditemukan: " + sheetName);

  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idColIndex = headers.indexOf("id");
  if (idColIndex === -1) throw new Error("Kolom id tidak ditemukan");

  let targetRowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idColIndex]) === String(id)) {
      targetRowIndex = i + 1; // 1-based row index
      break;
    }
  }

  if (targetRowIndex === -1) {
    throw new Error("Data dengan ID " + id + " tidak ditemukan");
  }

  updatedItem.updatedAt = getJakartaTimestamp();

  for (let j = 0; j < headers.length; j++) {
    const key = headers[j];
    if (updatedItem[key] !== undefined) {
      let val = updatedItem[key];
      if (typeof val === "object") {
        val = JSON.stringify(val);
      }
      sheet.getRange(targetRowIndex, j + 1).setValue(val);
    }
  }

  logActivity(user, "Petugas BPJS", "UPDATE", sheetName, id, "Memperbarui data ID: " + id);
  return updatedItem;
}

/**
 * Menghapus data dari sheet
 */
function deleteData(sheetName, id, user) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error("Sheet tidak ditemukan: " + sheetName);

  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idColIndex = headers.indexOf("id");

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idColIndex]) === String(id)) {
      sheet.deleteRow(i + 1);
      logActivity(user, "Petugas BPJS", "DELETE", sheetName, id, "Menghapus data ID: " + id);
      return { success: true, deletedId: id };
    }
  }

  throw new Error("Data ID " + id + " tidak ditemukan untuk dihapus");
}

/**
 * Unggah file ke Google Drive (Base64)
 */
function uploadFile(fileName, base64Data, mimeType, user) {
  let folder;
  if (DRIVE_FOLDER_ID && DRIVE_FOLDER_ID !== "PASTE_YOUR_DRIVE_FOLDER_ID_HERE") {
    folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  } else {
    folder = DriveApp.getRootFolder();
  }

  const decodedBytes = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(decodedBytes, mimeType || "application/pdf", fileName);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const fileUrl = file.getUrl();
  const downloadUrl = file.getDownloadUrl();

  logActivity(user, "Petugas BPJS", "CREATE", "GoogleDrive", file.getId(), "Unggah file dokumen: " + fileName);

  return {
    fileId: file.getId(),
    fileName: fileName,
    fileUrl: fileUrl,
    downloadUrl: downloadUrl,
    size: (file.getSize() / 1024).toFixed(1) + " KB"
  };
}

/**
 * Mencatat aktivitas ke sheet ActivityLogs
 */
function logActivity(userName, role, action, entity, targetId, details) {
  try {
    const ss = getSpreadsheet();
    let sheet = ss.getSheetByName("ActivityLogs");
    if (!sheet) return;

    sheet.appendRow([
      generateBpjsId("LOG"),
      getJakartaTimestamp(),
      userName || "Admin",
      role || "Super Admin",
      action || "INFO",
      entity || "General",
      targetId || "-",
      details || ""
    ]);
  } catch (e) {
    Logger.log("Failed to write activity log: " + e.toString());
  }
}

/**
 * Otentikasi Admin
 */
function authenticateAdmin(username, password) {
  // Verifikasi sederhana untuk kebutuhan portal rumah sakit
  if (username === "admin" && password === "bpjs2026") {
    logActivity(username, "Super Admin", "LOGIN", "Auth", "SESSION", "Login berhasil ke panel admin.");
    return { success: true, username: "admin", name: "Koordinator BPJS RS", role: "Super Admin" };
  }
  return { success: false, message: "Username atau password salah!" };
}

/**
 * Statistik Dashboard
 */
function getDashboardStats() {
  const regulations = getSheetData("Regulations");
  const officers = getSheetData("Officers");
  const documents = getSheetData("Documents");
  const faqs = getSheetData("FAQs");
  const announcements = getSheetData("Announcements");

  return {
    totalRegulations: regulations.length,
    activeRegulations: regulations.filter(r => r.status === "Aktif").length,
    totalOfficers: officers.length,
    activeOfficers: officers.filter(o => o.statusAktif === true || o.statusAktif === "TRUE" || o.statusAktif === "true").length,
    totalDocuments: documents.length,
    totalFaqs: faqs.length,
    totalAnnouncements: announcements.length,
    lastUpdated: getJakartaTimestamp()
  };
}

/**
 * Ambil semua data aplikasi untuk sinkronisasi awal
 */
function getAllData() {
  return {
    settings: getSettings(),
    regulations: getSheetData("Regulations"),
    officers: getSheetData("Officers"),
    channels: getSheetData("RegistrationChannels"),
    services: getSheetData("Services"),
    faqs: getSheetData("FAQs"),
    documents: getSheetData("Documents"),
    announcements: getSheetData("Announcements"),
    logs: getSheetData("ActivityLogs").slice(-50).reverse(),
    stats: getDashboardStats()
  };
}

function getSettings() {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName("Settings");
  if (!sheet) return {};

  const values = sheet.getDataRange().getValues();
  const settings = {};
  for (let i = 1; i < values.length; i++) {
    const k = values[i][0];
    const v = values[i][1];
    if (k) settings[k] = v;
  }
  return settings;
}

function updateSettings(newSettings, user) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName("Settings");
  if (!sheet) {
    sheet = ss.insertSheet("Settings");
    sheet.appendRow(["key", "value", "updatedAt"]);
  }

  for (const k in newSettings) {
    sheet.appendRow([k, newSettings[k], getJakartaTimestamp()]);
  }
  logActivity(user, "Super Admin", "UPDATE", "Settings", "GLOBAL", "Pengaturan rumah sakit diperbarui");
  return newSettings;
}
`;
