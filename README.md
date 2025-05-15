# The Story Finder

## Description

The Story Finder (formerly Rule Quiz) is a tool designed to help users discover their unique strengths and growth areas related to seven fundamental "rules" and their corresponding qualities: Authenticity, Courage, Vulnerability, Diligence, Significance, Authentic Relationship, and Integrity of Purpose. It acts as an entry point to self-discovery by identifying areas where users naturally excel at breaking limiting rules or areas where they may grow.

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (for storing quiz results)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/story-finder.git
cd story-finder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```env
DATABASE_URL="your-postgresql-connection-string"
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-admin-password"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## Technology Stack

### Frontend
- **Next.js 13** with App Router
- **React 18** for UI components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **jsPDF** for PDF generation

### Backend
- **Prisma** as ORM
- **PostgreSQL** for database
- **Next.js API Routes** for backend functionality

### Development Tools
- **ESLint** for code linting
- **Prettier** for code formatting

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── quiz/              # Quiz interface
│   └── admin/             # Admin analytics dashboard
├── components/            # React components
│   ├── Quiz.tsx          # Main quiz component
│   ├── Results.tsx       # Quiz results component
│   └── AnalyticsDashboard.tsx
├── lib/                   # Shared utilities
└── data/                  # Quiz questions and content
```

## Features

*   **Quiz Interface:**
    *   28 statements with a slider (0-10, starting at 5, numbers visible) for each.
    *   Questions are answered in groups of four.
    *   Progress bar showing completion of each group.
*   **Scoring Engine:**
    *   Calculates a score (0-100) for each rule.
*   **Results Page:**
    *   Graphical table of scores, ordered by deviation from 50.
    *   Personalized interpretation text:
        *   High Score (80-100): Positive message about the corresponding quality.
        *   Low Score (0-20): Encouraging message about the rule as a potential challenge.
*   **Anonymity:**
    *   No user login or personal information required.
*   **Downloadable Results:**
    *   Option to download results. (Format to be determined)
*   **Anonymous Data Storage:**
    *   All quiz results stored anonymously on the back end.
*   **Rule-Breaking Coach (You!)**:
    *   Embedded guide throughout the quiz
*   **Retaking the Quiz:**
    *   When a user finishes the quiz and clicks "Take the Quiz Again," the app deletes their most recent quiz result from the database before starting a new quiz. This is done using a deviceId cookie for anonymous identification, ensuring only the latest result per user/device is stored and keeping the data clean and accurate.
    *   For more robust tracking, the deviceId is set as a cookie on quiz completion and included in the result payload.

**Rule 1: BE NORMAL**

Quality: Authenticity

1. I am quite open about my strengths, weaknesses, and eccentricities and tend to share them rather than keeping them to myself.
2. I spend more time talking about what I want than I complain about what isn't right, and what I DON'T want.
3. I am happy with the amount of time I get to spend doing things that I love.
4. I seldom use alcohol or other substances as a way to relax and just be myself around others.


**Rule 2: AVOID MISTAKES**

Quality: Courage

5. I am willing to try something new before knowing if it will work.
6. I consider myself a creative person.
7. Some people are overwhelmed by a lack of structure, but that's not me—freedom excites me.
8. I notice when I am assuming the worst about a future outcome and actively practice imagining more positive outcomes.


**Rule 3: BE INDEPENDENT**

Quality: Vulnerability

9. It's not hard for me to ask for help when I need it and I regularly do.
10. I readily accept offers of help or assistance, rather than saying things like "no thanks," "I'm fine," or "I can handle it."
11. I am very aware that the efforts of others contribute to my success.
12. I seek out expert opinions in areas where I don't have much experience.


**Rule 4: STAY COMFORTABLE**

Quality: Diligence

13. I exercise regularly, either with formal fitness activities or other physical recreational activities.
14. I am able to interrupt myself in a moment of comfort if I realize there is something that needs to be actively attended to.
15. The idea of breaking a sweat to get something done doesn't dissuade me from taking action—in fact, I look forward to it.
16. I remind myself how good it will feel when I'm done as a way to get in motion with tasks, labor, and projects that I'm resisting in the moment.


**Rule 5: PRETEND YOU DON'T MATTER**

Quality: Significance

17. I notice small things that need attention in my environment and take necessary action.
18. I regularly take time to myself for reflection, re-charging, or contemplation.
19. I follow my instinct to take action, make a communication or move in a certain direction even when I don't have a logical reason to do so.
20. I make myself visible and available in a group setting rather than fading into the background, sitting at the edges, or attending virtual meetings with my camera off.


**Rule 6: STAY IN CONTROL**

Quality: Authentic Relationship

21. I ask questions of others and show interest in their perspectives and experiences.
22. I seek out the company of others and look for opportunities to share experiences of recreation or learning.
23. I'm in the habit of offering praise, appreciation and acknowledgment to people I work with or that work for me.
24. I tend to focus more on identifying shared interests and perspectives in conflict situations rather than having to be right or get my way.


**Rule 7: BE POPULAR**

Quality: Integrity of Purpose

25. I'll excuse myself from conversations, projects, activities and perspectives that do not resonate with my vision, even if means leaving in the middle sometimes.
26. The knowledge that someone may disagree with my decision or action doesn't dissuade me from moving forward.
27. I can easily voice dissenting perspectives, opinions, and points of view in a group when I feel it's needed.
28. I am willing to question or disagree with authority figures when I believe they are in the wrong.



## Quiz Rules and Questions

[Previous rules and questions section remains the same...]

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Deployment
The application is automatically deployed to Vercel when changes are pushed to the main branch.

## Analytics Dashboard

Access the analytics dashboard at `/admin/analytics` with:
- Username: [configured in env]
- Password: [configured in env]

Features include:
- Total quizzes completed
- Average scores per rule
- Score distributions
- Downloadable PDF reports

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Features

*   Personalized story prompts based on quiz results.
*   Data visualization (scatter plots, etc.).
*   More detailed interpretations of quiz results.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
