// تحميل النموذج كملف PDF
document.addEventListener('DOMContentLoaded', function() {
    
    // تفعيل flatpickr لحقول التاريخ
    if (typeof flatpickr !== 'undefined') {
        flatpickr(".date-picker", {
            dateFormat: "d/m/Y",
            locale: "ar",
            allowInput: true,
            errorHandler: function(error) {
                // تجاهل أخطاء التاريخ غير الصحيحة
                console.warn('تحذير في حقل التاريخ:', error);
            }
        });
        console.log('تم تفعيل حقول التاريخ بنجاح');
    } else {
        console.error('مكتبة flatpickr غير محملة');
    }
    
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async function() {
            // التحقق من ملء جميع الحقول المطلوبة في النموذج
            // const allInputs = document.querySelectorAll('input[type="text"], textarea');
            // let hasEmptyFields = false;
            
            // allInputs.forEach((input) => {
            //     if (!input.value.trim()) {
            //         hasEmptyFields = true;
            //     }
            // });
            
            // if (hasEmptyFields) {
            //     alert('يرجى ملء جميع الحقول المطلوبة قبل التحميل');
            //     return;
            // }
            
            // التحقق من تحميل مكتبة html2pdf
            if (typeof html2pdf === 'undefined') {
                alert('جاري تحميل المكتبة... يرجى المحاولة مرة أخرى بعد ثانية.');
                return;
            }
            
            // إظهار رسالة التحميل
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'جاري التحميل...';
            downloadBtn.disabled = true;
            
            try {
                // الحصول على العنصر المراد تحويله لـ PDF
                const element = document.getElementById('formContainer');
                
                // الحصول على اسم العميل من الخانة الأولى
                const customerNameInput = document.querySelector('.form-table input[type="text"]');
                const customerName = customerNameInput ? customerNameInput.value.trim() : 'عميل';
                
                // تنظيف اسم العميل (إزالة الأحرف غير المسموحة)
                const sanitizedName = customerName.replace(/[^a-zA-Z0-9ء-ي\s]/g, '').trim() || 'عميل';
                
                // إعدادات PDF محسّنة
                const opt = {
                    margin: [5, 5, 5, 5],
                    filename: `نموذج_تسوية_${sanitizedName}.pdf`,
                    image: { 
                        type: 'jpeg', 
                        quality: 0.98 
                    },
                    html2canvas: { 
                        scale: 2,
                        useCORS: false,
                        allowTaint: true,
                        logging: false,
                        scrollY: 0,
                        scrollX: 0,
                        backgroundColor: '#ffffff'
                    },
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'portrait'
                    },
                    pagebreak: { 
                        mode: ['avoid-all', 'css', 'legacy']
                    }
                };
                
                // تحويل HTML إلى PDF
                await html2pdf().set(opt).from(element).save();
                
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
                
            } catch (error) {
                console.error('خطأ في إنشاء PDF:', error);
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
                alert('حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.');
            }
        });
    }
    
    console.log('النموذج جاهز للاستخدام');
});
