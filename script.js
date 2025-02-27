document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkInForm');
    const photoInput = document.getElementById('photoInput');
    const imagePreview = document.getElementById('imagePreview');
    const WEBHOOK_URL = 'https://hook.eu2.make.com/2jlyljo3p3lu2pn2dn47jv46ozmy85sy';

    // 處理照片預覽
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="預覽圖">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // 處理表單提交
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            locationName: document.getElementById('locationName').value,
            address: document.getElementById('address').value,
            description: document.getElementById('description').value,
            photo: imagePreview.querySelector('img')?.src || ''
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('提交成功！');
                form.reset();
                imagePreview.innerHTML = '';
            } else {
                throw new Error('提交失敗');
            }
        } catch (error) {
            alert('發生錯誤：' + error.message);
        }
    });
});
