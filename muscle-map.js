const muscleData = {
    "male": {
        "front": {
            "calves": ["M502.8,1183.5c-.68,1.05-1.86,1.29-2.74,1.31-.93.02-1.69.81-1.69,1.77,0,.38-.14,1.54-.78,2.18-.39.38-.97.56-1.75.53-.8-.04-1.51.52-1.72,1.32,0,.03-.6,2.33-2.27,3.3-.86.51-1.8.6-2.68.27-.64-.24-1.27-.19-1.77.15-1.6,1.08-2.62,3.1-2.62,5.39,0,3.17.99,6.32,2.95,8.88,1.3,1.67,2.79,2.65,4.36,2.91,1.04.17,2.08-.1,3.08-.79.74-.5,1.36-1.27,1.8-2.29.37-.83.66-1.89.85-3.16,1.44-.12,2.78.3,3.89,1.26,1.42,1.23,2.13,3.08,2.13,5.52,0,1.75-.33,3.58-.99,5.46-.3.84-.74,1.52-1.3,2.02-.85.77-1.96,1.16-3.3,1.16s-2.45-.39-3.3-1.16c-.56-.5-1-1.18-1.3-2.02"],
            "quads": ["M452.4,783.8s0,.06-.02.09c0,.02,0,.04,0,.06-.8,3.72-1.52,7.5-2.22,11.15-3.01,15.71-5.86,30.55-13.07,34.21-2.93,1.49-6.55,1.09-11.09-1.18-2.16-1.08-4.06-1.25-5.66-.47-3.13,1.5-5.34,5.32-7.02,10.75-1.01,3.2-1.85,6.88-2.65,10.83-1.44,7.04-2.94,14.37-5.44,20.63-.59,1.5-.88,2.46-.88,3.01,0,.95.32,1.86.99,2.74.66.87,1.55,1.34,2.65,1.38.53.02,1.07-.09,1.63-.33.75-.34,1.43-.9,2.02-1.66.66-.87,1.18-2.08,1.54-3.62l7.62-38.65c.29-1.46,1.03-2.45,2.2-2.97,1.17-.52,2.36-.34,3.57.54,1.21.88,1.81,2.02,1.81,3.42,0,.9-.2,2.02-.6,3.37l-7.62,38.65c-.36,1.86-.59,3.49-.59,4.86,0,2.05.53,3.94,1.58,5.68.46.75,1,1.38,1.59,1.88,1.23,1.06,2.63,1.59,4.18,1.59,1.56,0,2.95-.53,4.18-1.59.59-.5,1.13-1.13,1.59-1.88,1.06-1.74,1.58-3.63,1.58-5.68"],
            "abs": ["M385.82,350.44c-2.32-5.36-9.35-9.32-16.39-12.32-.03-.02-.05-.03-.08-.03-1.6-.57-3.18-1.2-4.75-1.9-.03,0-.06-.02-.09-.04-10.51-3.96-23.74-6.74-29.44-2.69-1.99,1.42-2.95,3.62-2.9,6.39.03,1.81.42,4.01,1.18,6.52,1.53,5.08,4.41,11.39,8.37,18.44,1.94,3.5,4.03,7.1,6.22,10.75,1.09,1.81,2.21,3.64,3.35,5.48,1.18,1.93,2.38,3.87,3.59,5.82,2.4,3.9,4.87,7.92,7.32,11.82,1.23,2,2.43,3.94,3.61,5.83,1.19,1.91,2.35,3.77,3.48,5.57,2.27,3.63,4.37,7.01,6.25,10.06"],
            "obliques": ["M272.8,406.06c-2.74,15.58-5.85,33.23-3.49,49.66,4.83,33.57-6.55,48.85-11.65,53.86-6.22,6.09-16.8,8.99-26.23,7.31,1.27-10.42,2.32-20.17,2.91-27.28.42-5.01,1.09-10.04,1.79-15.06.2-1.46.41-2.9.62-4.32,1.53-9.67,3.27-20.62,6.63-30.13,2.01-5.71,4.72-10.74,7.96-14.94,2.02-2.58,4.23-4.73,6.6-6.44,1.48-1.05,3.03-1.88,4.62-2.47,1.02-.37,2.07-.65,3.15-.86.77-.15,1.55-.27,2.35-.35.98-.1,1.99-.15,3.03-.16,1.48,0,3,.09,4.54.24.96.09,1.92.2,2.87.33"],
            "hands": ["M641.72,606.51c-.72-3.08-1.76-4.39-3.21-6.2-1.2-1.5-2.6-3.25-4-6.33.39,3.69,1.45,5.88,2.44,7.89,1.11,2.27,2.25,4.62,2.18,8.39-.07,3.27.15,5.48.38,7.62.33,3.14.62,6.1-.21,11.3-.36,2.22-.99,4.33-1.81,6.26-1.05,2.5-2.39,4.47-3.98,5.85-2.35,2.02-5.22,3.03-8.55,3.03-3.76,0-7.19-1.27-10.27-3.82-2.07-1.78-3.73-4.21-4.94-7.27-.71-1.8-1.25-3.75-1.62-5.81-.37-2.1-.55-4.29-.55-6.54,0-3.97.57-7.82,1.69-11.52.56-1.9,1.27-3.73,2.11-5.45.84-1.72,1.83-3.31,2.95-4.74"],
            "forearms": ["M629.69,522.22c-1.13,6.78-4.65,12.42-9.28,14.77-4.03,2.05-9.46,1.91-15.01-.38-2.21-4.21-5.19-8.37-6.61-10.26-.04-.04-.08-.1-.13-.14-8.02-8.58-14.46-13.59-20.69-18.45-8.62-6.78-18.54-14.54-28.84-24.73"],
            "front-shoulders": ["M510.6,303.91c-1.61-.91-3.25-1.75-4.94-2.53-7.64-3.49-14.56-4.88-19.19-5.42-7.44-1.87-13.18-4.12-16.62-6.5-12.81-8.87-22.9-20.97-27.79-26.83-4.59-5.52-7.95-10.07-11.44-14.86"],
            "chest": ["M473.89,295.55c-14.9.39-23.27,9.22-29.96,17.52-.93,1.15-1.89,2.26-2.88,3.34-.09.06-.16.13-.23.22-.15.17-.28.32-.44.49-18.16,19.25-45.55,26.23-69.71,17.75-1.63-.69-3.27-1.34-4.91-1.95"],
            "traps": ["M287.92,178.7v20.85c0,10-5.2,13.67-16.13,17.47-3.35-1.33-19.62-7.35-37.88-7.02.31-.25.64-.52,1.01-.81,3.15-2.52,7.46-5.96,10.44-7.35,1.96-.92,6.52-2.88,11.35-4.94,7.4-3.17,16.72-7.17,31.21-18.2"],
            "biceps": ["M496.5,299.82h-.04c-7.63-1.9-13.62-4.2-17.35-6.79-13.04-9.03-23.37-21.44-28.14-27.15-14.81-17.79-17.05-25.8-32.65-35.93-8.58-5.57-19.32-8.96-19.32-8.96"]
        },
        "back": {
            "traps": ["M233.69,210.53c3.21-1.97,7.59-4.66,10.69-6.06,1.99-.9,6.6-2.81,11.49-4.84,5-2.07,10.45-4.34,14.44-6.07.04,0,.07,0,.11-.02,19.55-5.27,40.39-4.24,51.58-3.69,1.19.06,2.28.11,3.35.14"],
            "calves": ["M475.03,965.71v.08c-1.41,26.22-4.62,53.06-17.62,53.83-7.32.45-13.09-11.27-17.28-19.82-3.48-7.09-5.78-11.78-9.14-11.49-4.23.36-4.81,5.96-5.54,13.06-.9,8.78-2.02,19.7-10.11,25.18"],
            "hamstrings": ["M455.77,791.39c-1.19,6.38-2.58,12.65-4.21,18.78-.49,2.22-.72,4.55-.76,7-3.9,15.79-9.27,30.08-15.03,30.77-2.1.24-6.46-1.5-12.31-16.1-7.27-18.11-9.18-19.9-11.54-19.49-2.7.39-3.77,3.57-5.29,9.84"],
            "glutes": ["M419.87,622.8c-11.23,16.25-31.67,19.17-39.94,19.67-1.65.1-3.31.21-4.94.31-14.32.96-27.85,1.87-35.6-5.29-4.96-4.58-7.37-12.25-7.37-23.45v-60.34c0-17.89,5.12-30.73,15.2-38.16,6.39-4.66,14.82-5.09,24.88-1.29,5.95,2.26,11.36,6.04,16.26,11.34"],
            "hands": ["M639.94,626.64c.44-.52.36-.97-.63-3.61-1.08-2.9-2.88-7.75-3.72-16.17-.15-.79-.35-1.86-.5-2.34-.1-.02-.21-.03-.32-.06-.87-.16-2.16-.4-4.18-1.33.36,1.75.52,3.52.69,5.35.22,2.4.54,5.87.67,8.93"],
            "forearms": ["M641.37,536.12c-1.96,6.88-5.9,12.17-10.38,13.89-4.44,1.69-10.73.5-16.91-3.2-4.3-9.14-14.31-23.73-36.66-46.42-13.84-13.95-23.22-30.12-32.29-45.76-5.73-9.89-11.14-19.21-17.23-27.98"],
            "triceps": ["M558.73,386.68c-1.2,1.24-4.96.14-8.28-.83-4.59-1.34-9.33-2.73-12.84-.57-3.41,2.1-3.73,7.68-4.08,13.59-.32,5.5-.68,11.73-3.7,12.96-2.65,1.08-9.14-.61-24.99-14.77"],
            "lats": ["M460.55,310.16c-2.47,11.73-4.81,22.83-1.44,29.18-1.15,5.04-8.99,38.57-20.51,56.67-11.74,18.46-11.85,45.39-11.92,59.85,0,1.61-.02,3.08-.04,4.39-.2,12.91,3.54,55.42,9.02,78.37"],
            "lowerback": ["M384.18,506.32c-12-2.59-27.49-2.09-39.07,6.44-7.44,5.48-12.42,13.54-14.86,24.07-2.44-10.53-7.42-18.59-14.86-24.07-11.58-8.53-27.07-9.03-39.06-6.44,6.12-7.5,5.66-18.21,5.5-31.43"],
            "traps-middle": ["M390.36,237.49c-18.28,34.34-29.74,61.7-37.49,82.12,0,0,0,.03-.02.04,0,.04-.03.06-.04.1-1.22,3-2.31,5.9-3.25,8.73-.03.04-.04.09-.05.13-1.56,4.29-2.96,8.2-4.22,11.72"],
            "rear-shoulders": ["M511.59,288.79c-3.24-2.06-8.25-4.62-13.43-4.9-.56-.04-1.2-.06-1.91-.09-6.97-.31-21.03-.93-34.55-7.07-4.38-1.99-8.7-4.55-12.71-7.89-6.97-5.78-13.74-10.96-20.27-15.97"]
        }
    }
};

const muscleNames = {
    "traps": { ar: "عضلة الترابيس", en: "Traps" },
    "calves": { ar: "عضلة السمانة", en: "Calves" },
    "hamstrings": { ar: "العضلات الخلفية للفخذ", en: "Hamstrings" },
    "glutes": { ar: "عضلات المؤخرة", en: "Glutes" },
    "triceps": { ar: "عضلة التراي سيبس", en: "Triceps" },
    "lats": { ar: "عضلة الظهر الجانبية", en: "Lats" },
    "lowerback": { ar: "أسفل الظهر", en: "Lower Back" },
    "quads": { ar: "عضلة الفخذ الأمامية", en: "Quads" },
    "abs": { ar: "عضلات البطن", en: "Abs" },
    "obliques": { ar: "عضلات الجوانب", en: "Obliques" },
    "chest": { ar: "عضلة الصدر", en: "Chest" },
    "front-shoulders": { ar: "الكتف الأمامي", en: "Front Shoulders" },
    "rear-shoulders": { ar: "الكتف الخلفي", en: "Rear Shoulders" },
    "hands": { ar: "العضلات حول اليد", en: "Hands/Wrists" },
    "forearms": { ar: "عضلات الساعد", en: "Forearms" },
    "biceps": { ar: "عضلة البايسبس", en: "Biceps" },
    "traps-middle": { ar: "منتصف الظهر", en: "Middle Back" }
};

let currentGender = 'male';
let currentView = 'front';
let selectedMuscle = null;

function renderSVG() {
    const container = document.getElementById('muscle-map-svg');
    const data = muscleData[currentGender][currentView];
    
    let svgContent = `<svg viewBox="0 0 660.46 1206.46" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; min-height: 400px;">`;
    
    // Add styles
    svgContent += `<style>
        .muscle-path {
            fill: rgba(212, 175, 55, 0.3);
            stroke: var(--primary-gold, #d4af37);
            stroke-width: 1.5;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .muscle-path:hover {
            fill: rgba(212, 175, 55, 0.6);
            stroke-width: 2;
            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
        }
        .muscle-path.selected {
            fill: var(--primary-gold, #d4af37);
            stroke: #f0d860;
            stroke-width: 2;
            filter: drop-shadow(0 0 15px rgba(240, 216, 96, 0.6));
        }
    </style>`;

    for (const [id, paths] of Object.entries(data)) {
        svgContent += `<g id="group-${id}" class="muscle-group" data-muscle="${id}">`;
        if (Array.isArray(paths)) {
            for (const d of paths) {
                svgContent += `<path d="${d}" class="muscle-path" data-muscle="${id}" />`;
            }
        }
        svgContent += `</g>`;
    }
    
    svgContent += `</svg>`;
    container.innerHTML = svgContent;

    // Add event listeners
    document.querySelectorAll('.muscle-path').forEach(path => {
        path.addEventListener('mouseenter', handleMuscleHover);
        path.addEventListener('mouseleave', handleMuscleLeave);
        path.addEventListener('click', handleMuscleClick);
        path.addEventListener('touchstart', handleMuscleClick);
    });
}

function handleMuscleHover(e) {
    const muscleId = e.target.getAttribute('data-muscle');
    const name = muscleNames[muscleId]?.ar || muscleId;
    const nameEl = document.getElementById('muscle-name');
    const descEl = document.getElementById('muscle-description');
    
    if (nameEl) nameEl.innerText = name;
    if (descEl) descEl.innerText = `انقر لعرض تمارين ${name}`;
}

function handleMuscleLeave(e) {
    const nameEl = document.getElementById('muscle-name');
    const descEl = document.getElementById('muscle-description');
    
    if (!selectedMuscle) {
        if (nameEl) nameEl.innerText = "اختر عضلة...";
        if (descEl) descEl.innerText = "مرر الماوس أو اضغط على العضلة لمعرفة اسمها.";
    } else {
        const name = muscleNames[selectedMuscle]?.ar || selectedMuscle;
        if (nameEl) nameEl.innerText = name;
        if (descEl) descEl.innerText = `تم اختيار ${name}. استكشف التمارين الآن.`;
    }
}

function handleMuscleClick(e) {
    e.preventDefault();
    const muscleId = e.target.getAttribute('data-muscle');
    
    // Deselect previous
    document.querySelectorAll('.muscle-path.selected').forEach(p => p.classList.remove('selected'));
    
    // Select current group
    document.querySelectorAll(`[data-muscle="${muscleId}"]`).forEach(p => p.classList.add('selected'));
    
    selectedMuscle = muscleId;
    const name = muscleNames[muscleId]?.ar || muscleId;
    const nameEl = document.getElementById('muscle-name');
    const descEl = document.getElementById('muscle-description');
    
    if (nameEl) nameEl.innerText = name;
    if (descEl) descEl.innerText = `تم اختيار ${name}. استكشف التمارين المتاحة لهذه العضلة في تطبيق Warrior Way.`;
    
    const btn = document.getElementById('explore-muscle-btn');
    if (btn) {
        btn.style.display = 'inline-block';
        btn.href = `https://egyptfitness.com/exercises/${muscleId}`;
        btn.innerText = `تمارين ${name} ⚡`;
    }
}

// View controls
const frontBtn = document.getElementById('view-front');
const backBtn = document.getElementById('view-back');

if (frontBtn) {
    frontBtn.addEventListener('click', () => {
        currentView = 'front';
        frontBtn.classList.add('active');
        backBtn.classList.remove('active');
        selectedMuscle = null;
        const btn = document.getElementById('explore-muscle-btn');
        if (btn) btn.style.display = 'none';
        renderSVG();
    });
}

if (backBtn) {
    backBtn.addEventListener('click', () => {
        currentView = 'back';
        backBtn.classList.add('active');
        frontBtn.classList.remove('active');
        selectedMuscle = null;
        const btn = document.getElementById('explore-muscle-btn');
        if (btn) btn.style.display = 'none';
        renderSVG();
    });
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderSVG();
    });
} else {
    renderSVG();
}
