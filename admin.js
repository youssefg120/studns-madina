// نظام التخزين
const STORAGE_KEY = 'studyPlatformData';

// تحميل البيانات
function loadAdminData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        window.studyData = JSON.parse(savedData);
    } else {
        window.studyData = {
            lectures: [],
            reviews: [],
            bubbleSheets: [],
            exams: [],
            motivationMessages: []
        };
    }
    renderCurrentData();
}

// حفظ البيانات
function saveAdminData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.studyData));
    alert('✅ تم حفظ البيانات بنجاح!');
    renderCurrentData();
}

// عرض البيانات الحالية
function renderCurrentData() {
    const data = window.studyData;
    console.log('المحاضرات:', data.lectures.length);
    console.log('المراجعات:', data.reviews.length);
    console.log('نماذج الإجابة:', data.bubbleSheets.length);
    console.log('الامتحانات:', data.exams.length);
    console.log('الرسائل التحفيزية:', data.motivationMessages.length);
}

// التهيئة
document.addEventListener('DOMContentLoaded', function() {
    loadAdminData();
    
    // إضافة محاضرة
    document.getElementById('addLectureForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const lecture = {
            id: Date.now(),
            title: document.getElementById('lectureTitle').value,
            level: document.getElementById('lectureLevel').value,
            videoUrl: document.getElementById('lectureVideoUrl').value,
            description: document.getElementById('lectureDescription').value
        };
        
        window.studyData.lectures.push(lecture);
        saveAdminData();
        this.reset();
    });
    
    // إضافة مراجعة
    document.getElementById('addReviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const review = {
            id: Date.now(),
            title: document.getElementById('reviewTitle').value,
            content: document.getElementById('reviewContent').value,
            fileUrl: document.getElementById('reviewFileUrl').value || null
        };
        
        window.studyData.reviews.push(review);
        saveAdminData();
        this.reset();
    });
    
    // إضافة بابل شيت
    document.getElementById('addBubbleSheetForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const bubbleSheet = {
            id: Date.now(),
            subject: document.getElementById('bubbleSubject').value,
            fileUrl: document.getElementById('bubbleFileUrl').value
        };
        
        window.studyData.bubbleSheets.push(bubbleSheet);
        saveAdminData();
        this.reset();
    });
    
    // إضافة امتحان
    document.getElementById('addExamForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const exam = {
            id: Date.now(),
            title: document.getElementById('examTitle').value,
            level: document.getElementById('examLevel').value,
            year: document.getElementById('examYear').value,
            fileUrl: document.getElementById('examFileUrl').value,
            description: document.getElementById('examDescription').value
        };
        
        window.studyData.exams.push(exam);
        saveAdminData();
        this.reset();
    });
    
    // إضافة رسالة تحفيزية
    document.getElementById('addMotivationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const message = document.getElementById('motivationMessage').value;
        if (message.trim()) {
            window.studyData.motivationMessages.push(message.trim());
            saveAdminData();
            this.reset();
        }
    });
});