// نظام التخزين
const STORAGE_KEY = 'studyPlatformData';

// تحميل البيانات
function loadData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        return JSON.parse(savedData);
    }
    
    // البيانات الافتراضية - تم إضافة الأقواس الناقصة
    return {
        lectures: [],
        reviews: [],
        bubbleSheets: [],
        exams: [],
        motivationMessages: [
            "🦁 يا باشا! إنت قدها والله! كلمتين وتبقى محترف",
            "💪 روح يا كبير! الدنيا سهلة مع اللي زيك",
            "🎯 استمر يا معلم! النجاح قدامك",
            "🚀 إنت في المية! كمل عشان توصل",
            "🌈 متوقفش.. إنت أقوى من كدا",
            "🎓 يا بيه! إنت مستقبل مصر كلها",
            "🔥 دوس يا معلم! الإمتحانات هتبقى أسهل ما يكون",
            "⭐ إنت نجم والنجوم ما بتتكسفش",
            "🚀 طير يا حمامة! الأحلام قريبة",
            "💎 الألماس بيتشكل تحت الضغط، وإنت ألماس",
            "📚 يلا بينا نقفل مذاكرة يا أبطال!",
            "😎 اللي بيذاكر دلوقتي هيضحك بكرة",
            "🏃‍♂️ مش وقت الراحة.. إدفع نفسك",
            "✨ إنت نجم.. والنجوم بتتلمع في الظلام",
            "🌅 يوم جديد.. فرصة جديدة للتقدم",
            "🎯 تحدى اليوم: تخلص فصل كامل!",
            "🔑 الاستمرارية هيا سر النجاح",
            "🌠 حلم كبير.. وعزيمة أكبر",
            "🎯 ركز زي ما بتركز في الآخر.. وانت في الأول",
            "🏆 التحدي الحلو: تتفوق على نفسك",
            "🦅 مش هتكتفي بالقليل.. إنت جاي لعظمة",
            "🧠 الشوشرة برا.. والتركيز جوا",
            "⏰ الوقت ما بينسحبش.. استغله صح",
            "💖 محدش مثلك.. إنت فريد من نوعك",
            "🎁 مش هتخسر حاجة.. كدا كدا كسبان",
            "🛣️ اللي بيجري ورا حلمه ما بيقفش",
            "🌟 الطموح مش جريمة.. خلي طموحك عالي",
            "🎓 العلم سلاح.. وخلي سلاحك قوي",
            "😄 الضحكة الجاية أحلى.. كمل",
            "🦾 إنت أقوى مما تتخيل.. اثبت لنفسك"
        ]
    }; // ⬅️ هذه القوس كانت ناقصة
}

// حفظ البيانات
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// بيانات الموقع
let siteData = loadData();

// باقي الكود يبقى كما هو...
// رسالة الترحيب
function showWelcomeMessage() {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'flex';
            localStorage.setItem('hasSeenWelcome', 'true');
        }
    }
}

function closeWelcome() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }
}

// التاريخ والوقت
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const dateTimeString = now.toLocaleDateString('ar-EG', options);
    const datetimeElement = document.getElementById('datetime');
    
    if (datetimeElement) {
        datetimeElement.textContent = dateTimeString;
    }
}

// شريط الأخبار
function initNewsTicker() {
    const ticker = document.getElementById('newsTicker');
    if (!ticker) return;
    
    const newsItems = ticker.getElementsByTagName('span');
    let currentItem = 0;
    
    setInterval(() => {
        newsItems[currentItem].style.animation = 'none';
        setTimeout(() => {
            newsItems[currentItem].style.animation = 'ticker 20s linear infinite';
        }, 50);
        
        currentItem = (currentItem + 1) % newsItems.length;
    }, 8000);
}

// تحديث الإحصائيات
function updateStats() {
    const stats = {
        lectures: siteData.lectures.length,
        exams: siteData.exams.length,
        sheets: siteData.bubbleSheets.length,
        reviews: siteData.reviews.length
    };
    
    document.getElementById('lecturesCount').textContent = stats.lectures;
    document.getElementById('examsCount').textContent = stats.exams;
    document.getElementById('sheetsCount').textContent = stats.sheets;
    document.getElementById('reviewsCount').textContent = stats.reviews;
}

// وظائف العرض
function renderLectures(filter = 'all') {
    const container = document.getElementById('lecturesContainer');
    if (!container) return;
    
    const filteredLectures = filter === 'all' ? siteData.lectures : 
        siteData.lectures.filter(lecture => lecture.level === filter);
    
    if (filteredLectures.length === 0) {
        container.innerHTML = `
            <div class="course-card" style="text-align: center; padding: 3rem;">
                <h3>📚 لا توجد محاضرات متاحة حالياً</h3>
                <p>سيتم إضافة المحاضرات قريباً بإذن الله</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredLectures.map(lecture => `
        <div class="course-card">
            <h3>${lecture.title}</h3>
            <p>${lecture.description || ''}</p>
            ${lecture.videoUrl ? `
                <div class="video-container">
                    <video controls style="width: 100%; border-radius: 6px;">
                        <source src="${lecture.videoUrl}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو
                    </video>
                </div>
            ` : ''}
            <span class="level-badge">${lecture.level === 'first' ? 'فرقة أولى' : 'فرقة ثانية'}</span>
            ${lecture.videoUrl ? `<a href="${lecture.videoUrl}" download class="download-btn">📥 حمل المحاضرة</a>` : ''}
        </div>
    `).join('');
}

function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    
    if (siteData.reviews.length === 0) {
        container.innerHTML = `
            <div class="review-card" style="text-align: center; padding: 3rem;">
                <h3>📝 لا توجد مراجعات متاحة حالياً</h3>
                <p>سيتم إضافة المراجعات قريباً</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = siteData.reviews.map(review => `
        <div class="review-card">
            <h3>${review.title}</h3>
            <p>${review.content}</p>
            ${review.fileUrl ? `<a href="${review.fileUrl}" download class="download-btn">📥 حمل المرفق</a>` : ''}
        </div>
    `).join('');
}

function renderBubbleSheets() {
    const container = document.getElementById('bubbleSheetsContainer');
    if (!container) return;
    
    if (siteData.bubbleSheets.length === 0) {
        container.innerHTML = `
            <div class="bubble-card" style="text-align: center; padding: 3rem;">
                <h3>📋 لا توجد نماذج إجابة متاحة حالياً</h3>
                <p>سيتم إضافة النماذج قريباً</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = siteData.bubbleSheets.map(sheet => `
        <div class="bubble-card">
            <h3>${sheet.subject}</h3>
            <p>نموذج إجابة ${sheet.subject}</p>
            <a href="${sheet.fileUrl}" download class="download-btn">📥 حمل النموذج</a>
        </div>
    `).join('');
}

function renderExams(level = 'all') {
    const container = document.getElementById('examsContainer');
    if (!container) return;
    
    const filteredExams = level === 'all' ? siteData.exams : 
        siteData.exams.filter(exam => exam.level === level);
    
    if (filteredExams.length === 0) {
        container.innerHTML = `
            <div class="exam-card" style="text-align: center; padding: 3rem;">
                <h3>📊 لا توجد امتحانات متاحة حالياً</h3>
                <p>سيتم إضافة الامتحانات قريباً</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredExams.map(exam => `
        <div class="exam-card">
            <h3>${exam.title}</h3>
            <p>${exam.description || ''}</p>
            <div class="exam-info">
                <span class="level-badge">${exam.level === 'first' ? 'فرقة أولى' : 'فرقة ثانية'}</span>
                <span style="color: var(--text-color); opacity: 0.8;">سنة: ${exam.year}</span>
            </div>
            <a href="${exam.fileUrl}" download class="download-btn">📥 حمل الامتحان</a>
        </div>
    `).join('');
}

// وظائف التحكم
function changeMotivation() {
    const motivationText = document.getElementById('motivationText');
    if (motivationText && siteData.motivationMessages.length > 0) {
        const randomIndex = Math.floor(Math.random() * siteData.motivationMessages.length);
        motivationText.textContent = siteData.motivationMessages[randomIndex];
    }
}

// التهيئة
document.addEventListener('DOMContentLoaded', function() {
    // تحميل البيانات
    siteData = loadData();
    
    // عرض رسالة الترحيب
    showWelcomeMessage();
    
    // بدء التاريخ والوقت
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // بدء شريط الأخبار
    initNewsTicker();
    
    // تحديث الإحصائيات
    updateStats();
    
    // عرض المحتوى
    renderLectures();
    renderReviews();
    renderBubbleSheets();
    renderExams();
    changeMotivation();
    
    // إضافة event listeners للتصفية
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderLectures(this.dataset.filter);
        });
    });
    
    document.querySelectorAll('.filter-btn[data-level]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn[data-level]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderExams(this.dataset.level);
        });
    });
    
    // وضع الألوان
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            this.textContent = isDark ? '☀️ الوضع النهاري' : '🌙 الوضع الليلي';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // تحميل الوضع المحفوظ
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️ الوضع النهاري';
        }
    }
});