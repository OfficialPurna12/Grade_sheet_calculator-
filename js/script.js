let currentResults = null;

function calculateGrade() {
    const name = document.getElementById("studentName").value.trim() || "Anonymous";
    const subjects = [
        { name: "Web Development", id: "webdevelopment", icon: "💻" },
        { name: "C Programming", id: "cprogramming", icon: "🖥️" },
        { name: "Networking", id: "networking", icon: "🌐" },
        { name: "Cyber Security", id: "cybersecurity", icon: "🔒" },
        { name: "Digital Marketing", id: "digitalmarketing", icon: "📈" },
        { name: "English", id: "english", icon: "📚" }
    ];

    const marks = [];
    const subjectResults = [];
    let hasError = false;

    // Collect and validate marks
    subjects.forEach(subject => {
        const value = document.getElementById(subject.id).value;
        const mark = Number(value);
        
        if (value === '' || isNaN(mark) || mark < 0 || mark > 100) {
            hasError = true;
            return;
        }
        
        marks.push(mark);
        subjectResults.push({
            name: subject.name,
            icon: subject.icon,
            mark: mark,
            grade: getSubjectGrade(mark)
        });
    });

    // Clear previous messages
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("resultBox").classList.remove("show");

    if (hasError) {
        showError("❌ Please enter valid marks between 0 and 100 for all subjects.");
        return;
    }

    // Calculate results
    const total = marks.reduce((a, b) => a + b, 0);
    const average = total / marks.length;
    const overallGrade = getOverallGrade(average);
    const percentage = ((total / 600) * 100);
    
    // Calculate GPA
    const totalPoints = subjectResults.reduce((sum, subject) => sum + subject.grade.points, 0);
    const gpa = totalPoints / subjectResults.length;

    // Store current results for download
    currentResults = {
        name,
        subjects: subjectResults,
        total,
        average,
        percentage,
        gpa,
        overallGrade,
        date: new Date().toLocaleDateString()
    };

    // Display results
    displayResults(name, total, average, percentage, gpa, overallGrade, subjectResults);
}

function getSubjectGrade(mark) {
    if (mark >= 90) return { grade: "A+", color: "#22c55e", points: 4.0 };
    else if (mark >= 80) return { grade: "A", color: "#3b82f6", points: 3.7 };
    else if (mark >= 70) return { grade: "B+", color: "#6366f1", points: 3.3 };
    else if (mark >= 60) return { grade: "B", color: "#8b5cf6", points: 3.0 };
    else if (mark >= 50) return { grade: "C+", color: "#f59e0b", points: 2.3 };
    else if (mark >= 40) return { grade: "C", color: "#f97316", points: 2.0 };
    else if (mark >= 30) return { grade: "D", color: "#ef4444", points: 1.0 };
    else return { grade: "F", color: "#dc2626", points: 0.0 };
}

function getOverallGrade(average) {
    if (average >= 90) return { grade: "A+ Excellent! 🌟", color: "#22c55e" };
    else if (average >= 80) return { grade: "A Very Good! 🎉", color: "#3b82f6" };
    else if (average >= 70) return { grade: "B+ Good Job! 👍", color: "#6366f1" };
    else if (average >= 60) return { grade: "B Fair Work! 📈", color: "#8b5cf6" };
    else if (average >= 50) return { grade: "C+ Keep Improving! 💪", color: "#f59e0b" };
    else if (average >= 40) return { grade: "C More Effort Needed! 📚", color: "#f97316" };
    else if (average >= 30) return { grade: "D Study Harder! ⚡", color: "#ef4444" };
    else return { grade: "F Need Major Improvement! 🔥", color: "#dc2626" };
}

function displayResults(name, total, average, percentage, gpa, overallGrade, subjectResults) {
    const resultBox = document.getElementById("resultBox");
    
    // Create table rows for subjects
    const tableRows = subjectResults.map(subject => `
        <tr>
            <td>${subject.icon} ${subject.name}</td>
            <td style="text-align: center; font-weight: 600;">${subject.mark}</td>
            <td style="text-align: center; font-weight: 600;">${((subject.mark / 100) * 100).toFixed(1)}%</td>
            <td style="text-align: center;">
                <span class="grade-badge" style="background-color: ${subject.grade.color}">
                    ${subject.grade.grade}
                </span>
            </td>
            <td style="text-align: center; font-weight: 600; color: #4a5568;">${subject.grade.points}</td>
        </tr>
    `).join('');
    
    resultBox.innerHTML = `
        <div class="result-header">📋 Grade Report</div>
        <div class="result-details">
            <div class="result-item">
                <strong>Student Name</strong>
                <div class="result-value">👤 ${name}</div>
            </div>
            <div class="result-item">
                <strong>Total Marks</strong>
                <div class="result-value">${total} / 600</div>
            </div>
            <div class="result-item">
                <strong>Average Marks</strong>
                <div class="result-value">${average.toFixed(2)}</div>
            </div>
            <div class="result-item">
                <strong>Percentage</strong>
                <div class="result-value">${percentage.toFixed(2)}%</div>
            </div>
            <div class="result-item">
                <strong>Overall GPA</strong>
                <div class="result-value">${gpa.toFixed(2)} / 4.0</div>
            </div>
            <div class="result-item">
                <strong>Report Date</strong>
                <div class="result-value">📅 ${new Date().toLocaleDateString()}</div>
            </div>
        </div>
        <div class="grade-display">
            <div class="grade-label">Overall Grade</div>
            <div class="grade-value" style="color: ${overallGrade.color}">${overallGrade.grade}</div>
        </div>
        
        <div class="results-table">
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th style="text-align: center;">Marks</th>
                        <th style="text-align: center;">Percentage</th>
                        <th style="text-align: center;">Grade</th>
                        <th style="text-align: center;">Points</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                    <tr style="background-color: #f0f8ff; font-weight: 600; border-top: 2px solid #667eea;">
                        <td style="color: #2d3748;">📊 Overall Result</td>
                        <td style="text-align: center; color: #2d3748;">${total} / 600</td>
                        <td style="text-align: center; color: #2d3748;">${percentage.toFixed(1)}%</td>
                        <td style="text-align: center;">
                            <span class="grade-badge" style="background-color: ${overallGrade.color}">
                                ${overallGrade.grade.split(' ')[0]}
                            </span>
                        </td>
                        <td style="text-align: center; color: #2d3748; font-size: 1.1rem;">${gpa.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="download-section">
            <button onclick="downloadResults()" class="download-btn">📥 Download Report</button>
        </div>
    `;

    // Show result with animation
    setTimeout(() => {
        resultBox.classList.add("show");
    }, 100);
}

function downloadResults() {
    if (!currentResults) return;

    const { name, subjects, total, average, percentage, gpa, overallGrade, date } = currentResults;
    
    // Create CSV content
    let csvContent = "Grade Report\n";
    csvContent += `Student Name:,${name}\n`;
    csvContent += `Date:,${date}\n`;
    csvContent += `\n`;
    csvContent += "Subject,Marks,Percentage,Grade,Points\n";
    
    subjects.forEach(subject => {
        const subjectPercentage = ((subject.mark / 100) * 100).toFixed(1);
        csvContent += `${subject.name},${subject.mark},${subjectPercentage}%,${subject.grade.grade},${subject.grade.points}\n`;
    });
    
    csvContent += `\n`;
    csvContent += `Total Marks:,${total}/600\n`;
    csvContent += `Average Marks:,${average.toFixed(2)}\n`;
    csvContent += `Overall Percentage:,${percentage.toFixed(2)}%\n`;
    csvContent += `Overall GPA:,${gpa.toFixed(2)}/4.0\n`;
    csvContent += `Overall Grade:,${overallGrade.grade}\n`;

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Grade_Report_${name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showError(message) {
    const errorBox = document.getElementById("errorMessage");
    errorBox.textContent = message;
    errorBox.style.display = "block";
}

function resetForm() {
    // Reset all input fields
    document.getElementById("studentName").value = "";
    document.getElementById("webdevelopment").value = "";
    document.getElementById("cprogramming").value = "";
    document.getElementById("networking").value = "";
    document.getElementById("cybersecurity").value = "";
    document.getElementById("digitalmarketing").value = "";
    document.getElementById("english").value = "";

    // Hide results and error messages
    document.getElementById("resultBox").classList.remove("show");
    document.getElementById("errorMessage").style.display = "none";

    // Clear current results
    currentResults = null;

    // Focus on first input
    document.getElementById("studentName").focus();
}

// Add Enter key functionality
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateGrade();
    }
});

// Auto-focus on first input when page loads
window.addEventListener('load', function() {
    document.getElementById("studentName").focus();
});