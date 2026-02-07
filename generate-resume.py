from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.lib import colors

# Create PDF
doc = SimpleDocTemplate("public/resume.pdf", pagesize=letter)
story = []

# Styles
styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=24,
    textColor=colors.HexColor("#ffbb4d"),
    alignment=TA_CENTER,
    spaceAfter=20
)

heading_style = ParagraphStyle(
    'CustomHeading',
    parent=styles['Heading2'],
    fontSize=14,
    textColor=colors.HexColor("#333333"),
    spaceAfter=10,
    fontName='Helvetica-Bold'
)

body_style = ParagraphStyle(
    'CustomBody',
    parent=styles['BodyText'],
    fontSize=11,
    textColor=colors.HexColor("#333333"),
    spaceAfter=12,
    leading=14
)

# Title
story.append(Paragraph("JAMES LI", title_style))
story.append(Paragraph("Current Mathematics Undergraduate | Toronto Metropolitan University", body_style))
story.append(Spacer(1, 0.25 * inch))

# Contact Info
story.append(Paragraph("Contact", heading_style))
story.append(Paragraph("Toronto Metropolitan University", body_style))
story.append(Paragraph("Mathematics Department", body_style))
story.append(Paragraph("email@example.com", body_style))
story.append(Paragraph("linkedin.com/in/james-li", body_style))
story.append(Spacer(1, 0.2 * inch))

# Education
story.append(Paragraph("Education", heading_style))
story.append(Paragraph("Bachelor of Science in Mathematics", body_style))
story.append(Paragraph("Toronto Metropolitan University | Expected 2026", body_style))
story.append(Spacer(1, 0.2 * inch))

# Skills
story.append(Paragraph("Skills", heading_style))
skills = [
    "Mathematics: Calculus, Linear Algebra, Statistics, Differential Equations",
    "Programming: Python, R, JavaScript, TypeScript",
    "Data Analysis: Pandas, NumPy, D3.js",
    "Machine Learning: TensorFlow, Scikit-learn",
    "Tools: Git, LaTeX, MATLAB"
]
for skill in skills:
    story.append(Paragraph(skill, body_style))
story.append(Spacer(1, 0.2 * inch))

# Experience
story.append(Paragraph("Experience", heading_style))
story.append(Paragraph("Research Assistant", body_style))
story.append(Paragraph("Mathematics Department | 2024 - Present", body_style))
story.append(Paragraph("• Assist in mathematical data analysis and visualization", body_style))
story.append(Paragraph("• Contribute to statistical research projects", body_style))
story.append(Spacer(1, 0.1 * inch))

story.append(Paragraph("Web Developer Intern", body_style))
story.append(Paragraph("Tech Company | Summer 2024", body_style))
story.append(Paragraph("• Developed web applications using React and TypeScript", body_style))
story.append(Paragraph("• Collaborated on data visualization projects", body_style))
story.append(Spacer(1, 0.1 * inch))

# Projects
story.append(Paragraph("Projects", heading_style))
story.append(Paragraph("Data Visualization Dashboard", body_style))
story.append(Paragraph("• Created interactive dashboards using React and D3.js", body_style))
story.append(Paragraph("• Analyzed mathematical datasets with real-time visualization", body_style))
story.append(Paragraph("Technologies: React, D3.js, Python", body_style))
story.append(Spacer(1, 0.1 * inch))

story.append(Paragraph("Statistical Analysis Tool", body_style))
story.append(Paragraph("• Built web application for complex statistical analysis", body_style))
story.append(Paragraph("• Performed research data analysis", body_style))
story.append(Paragraph("Technologies: TypeScript, R, Shiny", body_style))
story.append(Spacer(1, 0.1 * inch))

# Build PDF
doc.build(story)
print("Resume PDF generated successfully!")