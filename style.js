/* style.js */

/* =====================================================================
   Dynamic Theme Customization
===================================================================== */

/**
 * メインカラーを更新する関数
 */
function updateMainColor(color) {
    document.documentElement.style.setProperty('--main-color', color);
    localStorage.setItem('mainColor', color); // メインカラーを保存
}

/**
 * サブカラーを更新する関数
 */
function updateSubColor(color) {
    document.documentElement.style.setProperty('--sub-color', color);
    localStorage.setItem('subColor', color); // サブカラーを保存
}

/**
 * フォントファミリーを更新する関数
 */
function updateFontFamily(fontFamily) {
    document.documentElement.style.setProperty('--font-family', fontFamily);
    localStorage.setItem('fontFamily', fontFamily); // フォントファミリーを保存

    // Google Fontsのリンクを動的に変更
    const googleFontLink = document.getElementById('google-font');
    if (googleFontLink) {
        googleFontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
            ' ',
            '+'
        )}:wght@400;500;700&display=swap`;
    }
}

/**
 * ページ読み込み時にカスタム設定を適用する関数
 */
function applyCustomSettings() {
    const mainColor = localStorage.getItem('mainColor') || '#172a88';
    const subColor = localStorage.getItem('subColor') || '#df0522';
    const fontFamily = localStorage.getItem('fontFamily') || 'Roboto';

    updateMainColor(mainColor);
    updateSubColor(subColor);
    updateFontFamily(fontFamily);

    // index.html 以外のページではカラーピッカーなどがないため、条件付きで更新
    const colorPicker = document.getElementById('colorPicker');
    const subColorPicker = document.getElementById('subColorPicker');
    const fontPicker = document.getElementById('fontPicker');

    if (colorPicker) colorPicker.value = mainColor;
    if (subColorPicker) subColorPicker.value = subColor;
    if (fontPicker) fontPicker.value = fontFamily;
}

document.addEventListener('DOMContentLoaded', () => {
    // ページ読み込み時にカスタム設定を適用
    applyCustomSettings();

    const colorPicker = document.getElementById('colorPicker');
    const subColorPicker = document.getElementById('subColorPicker');
    const fontPicker = document.getElementById('fontPicker');
    const saveButton = document.getElementById('saveSettings');
    const resetButton = document.getElementById('resetSettings');

    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            updateMainColor(e.target.value);
        });
    }

    if (subColorPicker) {
        subColorPicker.addEventListener('input', (e) => {
            updateSubColor(e.target.value);
        });
    }

    if (fontPicker) {
        fontPicker.addEventListener('change', (e) => {
            updateFontFamily(e.target.value);
        });
    }

    // 保存ボタンのイベントリスナー
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            localStorage.setItem('mainColor', colorPicker.value);
            localStorage.setItem('subColor', subColorPicker.value);
            localStorage.setItem('fontFamily', fontPicker.value);

            alert('Settings saved! All pages will now reflect the changes.');
        });
    }

    // リセットボタンのイベントリスナー
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            localStorage.removeItem('mainColor');
            localStorage.removeItem('subColor');
            localStorage.removeItem('fontFamily');
            location.reload();  // ページをリロードしてデフォルト設定に戻す
        });
    }
});



/* =====================================================================
   Page-Specific Scripts
===================================================================== */

/* 例: Index Page Specific Script */
document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('colorPicker');
    const fontPicker = document.getElementById('fontPicker');

    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            updateMainColor(e.target.value);
        });
    }

    if (fontPicker) {
        fontPicker.addEventListener('change', (e) => {
            updateFontFamily(e.target.value);
        });
    }
});

/* 他のページ固有のスクリプトも同様にセクションを分けて追加 */

/* =====================================================================
   SITE SIGNUP QUESTIONARY
===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            id: 'question1',
            question: '1. 勤務場所（都道府県）',
            type: 'select',
            options: ['北海道', '東京都', '大阪府', '福岡県', '沖縄県'],
        },
        {
            id: 'question2',
            question: '2. 雇用形態',
            type: 'checkbox',
            options: ['正社員', 'パート、アルバイト', '希望なし'],
        },
        {
            id: 'question3',
            question: '3. 勤務時間',
            type: 'radio',
            options: ['８時間残業なし', '８時間残業あり', '４時間程度', '２時間程度'],
        },
        {
            id: 'question4',
            question: '4. １週間勤務日数',
            type: 'radio',
            options: ['5日以下', '4日以下', '3日以下', '2日以下', '1日'],
        },
        {
            id: 'question5',
            question: '5. こだわり',
            type: 'checkbox',
            options: ['駅近', '福利厚生充実', '保育室', '残業なし'],
        },
        {
            id: 'question6',
            question: '6. 年収',
            type: 'checkbox',
            options: ['100万円未満', '200万円以上', '300万円以上', '400万円以上', '500万円以上', '600万円以上', '700万円以上', '800万円以上', '900万円以上', '1000万円以上'],
        },
        {
            id: 'question7',
            question: '7. 時給',
            type: 'checkbox',
            options: ['1100円以上', '1300円以上', '1500円以上', '2000円以上', '2500円以上'],
        },
        {
            id: 'question8',
            question: '8. 職場環境で重要視する点',
            type: 'checkbox',
            options: ['清潔さ', '静かさ', '自然光', 'リモートワーク可', 'チームの雰囲気'],
        },
        {
            id: 'question9',
            question: '9. そのほか希望があればお書きください',
            type: 'textarea',
            placeholder: '自由にお書きください',
        },
    ];

    const questionContainer = document.getElementById('question-container');

    function showConfirmation() {
        let confirmationHtml = '<h4>確認画面</h4>';
        questions.forEach((question, index) => {
            confirmationHtml += `<p><strong>${question.question}</strong><br>回答内容 ${index + 1}</p>`;
        });

        confirmationHtml += `
            <button class="btn btn-secondary" id="back-button">戻る</button>
            <a href="site_signup.html" class="btn btn-success">登録する</a>
        `;
        questionContainer.innerHTML = confirmationHtml;

        document.getElementById('back-button').addEventListener('click', function () {
            showQuestion(0);
        });
    }

    function showQuestion(index) {
        if (index >= questions.length) {
            showConfirmation();
            return;
        }

        const question = questions[index];
        let html = `<h4>${question.question}</h4>`;

        if (question.type === 'select') {
            html += `<select class="form-select mb-3" id="${question.id}">`;
            question.options.forEach(option => {
                html += `<option value="${option}">${option}</option>`;
            });
            html += `</select>`;
        } else if (question.type === 'checkbox') {
            question.options.forEach(option => {
                html += `
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="${option}" id="${option}">
                        <label class="form-check-label" for="${option}">
                            ${option}
                        </label>
                    </div>`;
            });
        } else if (question.type === 'radio') {
            question.options.forEach(option => {
                html += `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="${question.id}" value="${option}" id="${option}">
                        <label class="form-check-label" for="${option}">
                            ${option}
                        </label>
                    </div>`;
            });
        } else if (question.type === 'text') {
            html += `<input type="text" class="form-control mb-3" id="${question.id}" placeholder="${question.placeholder}" required>`;
        } else if (question.type === 'textarea') {
            html += `<textarea class="form-control mb-3" id="${question.id}" rows="3" placeholder="${question.placeholder}"></textarea>`;
        }

        html += `<button class="btn btn-primary" id="next-button">次へ</button>`;
        questionContainer.innerHTML = html;

        document.getElementById('next-button').addEventListener('click', function () {
            showQuestion(index + 1);
        });
    }

    showQuestion(0);
});
