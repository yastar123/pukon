const latitude = -5.3513514;  // Lintang pengamat
const longitude = 105.3058211;  // Bujur pengamat

// Konstanta astronomi
const e = 23.44;  // Obliqitas ekliptika (dalam derajat)
const earthOrbitRadius = 149.6e6; // Jarak rata-rata bumi ke matahari dalam km
const daysInYear = 365.25;  // Jumlah hari dalam setahun (rata-rata)

function hitungPosisiMatahari() {
    // Ambil tanggal dari input
    const tanggal = document.getElementById('tanggal').value;
    const tgl = new Date(tanggal + 'T07:00:00');  // Pukul 7 pagi

    // Hitung jumlah hari sejak 1 Januari
    const startOfYear = new Date(tgl.getFullYear(), 0, 0);
    const diff = tgl - startOfYear;
    const days = diff / (1000 * 60 * 60 * 24);

    // Menggunakan model perhitungan sederhana untuk posisi Matahari
    const n = days;  // Jumlah hari dari 1 Januari
    const meanLongitude = (280.460 + 0.9856474 * n) % 360;  // Panjang rata-rata Matahari
    const meanAnomaly = (357.528 + 0.9856003 * n) % 360;  // Anomali rata-rata
    const eclipticLongitude = meanLongitude + (1.915 * Math.sin(math.unit(meanAnomaly, 'deg').toNumber('rad'))) + 
                              (0.020 * Math.sin(math.unit(2 * meanAnomaly, 'deg').toNumber('rad')));  // Longitude ekliptika
    
    const obliquity = e + 0.0000004 * n;  // Obliqitas ekliptika dengan koreksi tahunan
    const sunDeclination = Math.asin(Math.sin(math.unit(obliquity, 'deg').toNumber('rad')) * Math.sin(math.unit(eclipticLongitude, 'deg').toNumber('rad')));

    const hourAngle = (15 * (7 - 12)) + longitude;  // Sudut jam Matahari pada pukul 7 pagi
    const azimuth = Math.atan2(Math.sin(math.unit(hourAngle, 'deg').toNumber('rad')),
                               Math.cos(math.unit(hourAngle, 'deg').toNumber('rad')) * Math.sin(sunDeclination));

    // Konversi azimuth ke derajat
    const azimuthDegree = math.unit(azimuth, 'rad').toNumber('deg');

    // Tentukan arah mata angin
    const arahMataAngin = hitungArahMataAngin(azimuthDegree);

    // Output ke layar
    document.getElementById('arah-mata-angi').textContent = 'Arah mata angin: ' + arahMataAngin;
    document.getElementById('derajat-arah').textContent = 'Derajat arah: ' + azimuthDegree.toFixed(2) + '°';

    // Gambar posisi matahari di canvas
    gambarPosisiMatahari(azimuthDegree);
}

function hitungArahMataAngin(azimuth) {
    // Menghitung arah mata angin berdasarkan azimuth
    if (azimuth >= 0 && azimuth <= 22.5) return 'Utara';
    if (azimuth > 22.5 && azimuth <= 67.5) return 'Timur Laut';
    if (azimuth > 67.5 && azimuth <= 112.5) return 'Timur';
    if (azimuth > 112.5 && azimuth <= 157.5) return 'Tenggara';
    if (azimuth > 157.5 && azimuth <= 202.5) return 'Selatan';
    if (azimuth > 202.5 && azimuth <= 247.5) return 'Barat Daya';
    if (azimuth > 247.5 && azimuth <= 292.5) return 'Barat';
    if (azimuth > 292.5 && azimuth <= 337.5) return 'Barat Laut';
    return 'Utara'; // Default untuk azimuth di atas 337.5
}

function gambarPosisiMatahari(azimuth) {
    const canvas = document.getElementById('sunPositionCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Clear canvas sebelumnya
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Konversi azimuth ke koordinat x,y pada canvas (perhitungan sederhana)
    const radius = 100; // Jarak dari tengah canvas untuk menggambar posisi matahari
    const angle = (azimuth - 90) * Math.PI / 180; // Ubah dari azimuth ke angle canvas (menggunakan -90 karena orientasi timur)

    // Posisi matahari
    const sunX = centerX + radius * Math.cos(angle);
    const sunY = centerY + radius * Math.sin(angle);

    // Gambar posisi matahari
    ctx.beginPath();
    ctx.arc(sunX, sunY, 12, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();
}