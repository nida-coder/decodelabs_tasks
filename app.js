// app.js (Updated - Fixed logout and dark theme)
// =============================================
// CHECK IF USER IS LOGGED IN
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // If no user logged in, redirect to login page
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // =============================================
    // UPDATE PROFILE WITH USER DATA
    // =============================================
    // Update profile picture
    const profilePic = document.getElementById('userProfilePic');
    if (profilePic && currentUser.profilePic) {
        profilePic.src = currentUser.profilePic;
    }
    
    // Update user name
    const userName = document.getElementById('userName');
    if (userName) userName.textContent = currentUser.name || 'Nida';
    
    // Update roll number
    const userRoll = document.getElementById('userRoll');
    if (userRoll) userRoll.textContent = currentUser.rollNumber || '12102030';
    
    // Update course
    const userCourse = document.getElementById('userCourse');
    if (userCourse) userCourse.textContent = currentUser.course || 'BTech. Computer Science & Engineering';
    
    // Update DOB - Format date
    const userDob = document.getElementById('userDob');
    if (userDob && currentUser.dob) {
        const date = new Date(currentUser.dob);
        userDob.textContent = date.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }
    
    // Update contact
    const userContact = document.getElementById('userContact');
    if (userContact) userContact.textContent = currentUser.contact || '03261213069';
    
    // Update email
    const userEmail = document.getElementById('userEmail');
    if (userEmail) userEmail.textContent = currentUser.email || 'unknown@gmail.com';
    
    // Update address
    const userAddress = document.getElementById('userAddress');
    if (userAddress) userAddress.textContent = currentUser.address || 'House No 504, Street No 40, Ganjh Mughal Pura, Lahore';

    // =============================================
    // SIDE MENU TOGGLE
    // =============================================
    const sideMenu = document.querySelector("aside");
    const profileBtn = document.querySelector("#profile-btn");
    const themeToggler = document.querySelector(".theme-toggler");
    const nextDay = document.getElementById('nextDay');
    const prevDay = document.getElementById('prevDay');

    // Profile button toggle for side menu
    profileBtn.onclick = function() {
        sideMenu.classList.toggle('active');
    }

    // =============================================
    // SCROLL EVENT - Add header shadow
    // =============================================
    window.onscroll = () => {
        sideMenu.classList.remove('active');
        if(window.scrollY > 0) {
            document.querySelector('header').classList.add('active');
        } else {
            document.querySelector('header').classList.remove('active');
        }
    }

    // =============================================
    // THEME TOGGLE - Save preference
    // =============================================
    const applySavedTheme = () => {
        const isDarkMode = localStorage.getItem('dark-theme') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
            document.documentElement.classList.add('dark-theme');
            themeToggler.querySelector('span:nth-child(1)').classList.add('active');
            themeToggler.querySelector('span:nth-child(2)').classList.remove('active');
        } else {
            document.body.classList.remove('dark-theme');
            document.documentElement.classList.remove('dark-theme');
            themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
            themeToggler.querySelector('span:nth-child(2)').classList.add('active');
        }
    }
    applySavedTheme();

    // Toggle theme on click
    themeToggler.onclick = function() {
        document.body.classList.toggle('dark-theme');
        document.documentElement.classList.toggle('dark-theme');
        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
        localStorage.setItem('dark-theme', document.body.classList.contains('dark-theme'));
    }

    // =============================================
    // TIMETABLE FUNCTIONS
    // =============================================
    let setData = (day) => {
        document.querySelector('table tbody').innerHTML = '';
        let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        document.querySelector('.timetable div h2').innerHTML = daylist[day];
        
        let daySchedule = [];
        switch(day) {
            case 0: daySchedule = Sunday; break;
            case 1: daySchedule = Monday; break;
            case 2: daySchedule = Tuesday; break;
            case 3: daySchedule = Wednesday; break;
            case 4: daySchedule = Thursday; break;
            case 5: daySchedule = Friday; break;
            case 6: daySchedule = Saturday; break;
        }

        daySchedule.forEach(sub => {
            const tr = document.createElement('tr');
            const trContent = `
                <td>${sub.time}</td>
                <td>${sub.roomNumber}</td>
                <td>${sub.subject}</td>
                <td>${sub.type}</td>
            `;
            tr.innerHTML = trContent;
            document.querySelector('table tbody').appendChild(tr);
        });
    }

    let now = new Date();
    let today = now.getDay();
    let day = today;

    // Toggle timetable visibility
    window.timeTableAll = function() {
        document.getElementById('timetable').classList.toggle('active');
        setData(today);
        document.querySelector('.timetable div h2').innerHTML = "Today's Timetable";
    }

    // Next/Previous day buttons
    nextDay.onclick = function() {
        day <= 5 ? day++ : day = 0;
        setData(day);
    }

    prevDay.onclick = function() {
        day >= 1 ? day-- : day = 6;
        setData(day);
    }

    setData(day);  
    document.querySelector('.timetable div h2').innerHTML = "Today's Timetable";
});

// =============================================
// LOGOUT FUNCTION - Works on all pages
// =============================================
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}