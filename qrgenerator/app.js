function showError(message) {
    var errorCard = document.getElementById('error-card');
    errorCard.innerHTML = message;
    errorCard.style.display = 'block';
    setTimeout(function () {
        errorCard.style.display = 'none';
    }, 5500);
}

function generateQRCode() {
    var input = document.getElementById('input').value;
    if (input == '') {
        showError('<i class="fa-solid fa-triangle-exclamation"></i>&nbsp; Please enter data to encode.');
        return;
    }
    // Clear the contents of the #qrcode element
    document.getElementById('qrcode').innerHTML = '';
    // Generate the new QR code
    var qrcode = new QRCode(document.getElementById('qrcode'), {
        text: input,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    // Show the download button
    document.getElementById('downloadBtn').classList.remove('hidden');
}


var downloadBtn = document.getElementById('downloadBtn');

function downloadQRCode() {
    var imgData = document.getElementById('qrcode').querySelector('img').src;
    var link = document.createElement('a');
    link.href = imgData;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}