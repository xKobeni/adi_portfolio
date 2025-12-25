// Shared Projects Data
// This file contains all project data that can be used across the portfolio

const PROJECTS_DATA = [
    {
        id: 0,
        title: 'InvenTrack',
        subtitle: 'A web-based inventory management and decision support system developed for the General Services Office (GSO), designed to improve how government offices manage supplies and assets through data-driven insights that support monitoring, planning, and inventory-related decision-making.',
        category: 'Web Development',
        url: 'https://example.com/inventrack',
        image: '',
        additionalContent: [
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Project Overview</h3><p class="mb-4">INVENTRACK is a web-based inventory management and decision support system developed for the General Services Office (GSO). The system is designed to improve how government offices manage supplies and assets by integrating data-driven insights that support monitoring, planning, and inventory-related decision-making.</p><p class="mb-4"><strong>Who experiences the problem?</strong></p><ul class="list-disc list-inside space-y-2 mb-4"><li>General Services Office (GSO) administrators and staff managing government inventory</li><li>Government departments requesting supplies and assets</li><li>Procurement officers planning and executing inventory purchases</li><li>Decision-makers needing accurate inventory data for resource allocation</li></ul>'
            },
            {
                type: 'image',
                src: '../../assets/images/InvenTrack/login.png',
                alt: 'InvenTrack Login Page'
            }
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Problem Statement</h3><p class="mb-4">The General Services Office traditionally relies on manual inventory records and spreadsheet-based tracking, which creates significant operational challenges:</p><div class="mb-4"><h4 class="font-semibold mb-2">Key Inefficiencies:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Time Delays:</strong> Manual record-keeping processes result in delayed request processing and slow response times for inventory needs</li><li><strong>Human Error:</strong> Spreadsheet-based tracking leads to inaccurate inventory records, data entry mistakes, and inconsistent information across departments</li><li><strong>Data Inconsistency:</strong> Lack of centralized system causes discrepancies between recorded stock levels and actual inventory, making it difficult to track item movement accurately</li><li><strong>Lack of Visibility:</strong> Limited insight into stock conditions, historical usage patterns, and inventory trends makes it challenging to plan procurement and allocate resources efficiently</li><li><strong>Planning Challenges:</strong> Difficulty in forecasting inventory needs and determining optimal restocking levels without historical data analysis</li></ul></div><p class="mb-4"><strong>Consequences:</strong> Delayed requests, inaccurate inventory records, inefficient procurement planning, and challenges in allocating resources efficiently across government departments.</p>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Proposed Solution</h3><p class="mb-4">INVENTRACK centralizes all inventory data into a single digital platform, allowing the GSO to monitor stock levels, track item movement, and analyze historical inventory data. By leveraging descriptive and prescriptive analytics within the system, INVENTRACK enables administrators to understand inventory usage patterns and receive system-generated guidance to support restocking and resource planning decisions.</p><div class="mb-4"><h4 class="font-semibold mb-2">How the System Solves the Problem:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Automation:</strong> Centralized database eliminates manual record-keeping, automating inventory tracking and reducing human error in data entry</li><li><strong>Data Accuracy:</strong> Real-time monitoring provides accurate stock levels and item availability, ensuring inventory records reflect actual conditions</li><li><strong>Real-time Access:</strong> Immediate visibility into inventory status enables faster request processing and decision-making</li><li><strong>Decision Support:</strong> Analytics-driven insights and system-generated recommendations help administrators make informed decisions about restocking, procurement planning, and resource allocation</li></ul></div><p class="mb-4"><strong>Why it\'s better:</strong> Unlike traditional spreadsheet-based systems, INVENTRACK provides a unified platform with integrated analytics capabilities, enabling the GSO to move from reactive inventory management to proactive, data-driven decision-making supported by historical usage patterns and predictive recommendations.</p>'
            },
            {
                type: 'image',
                src: '../../assets/images/InvenTrack/dashboard_1.png',
                alt: 'InvenTrack Dashboard'
            },
            {
                type: 'image',
                src: '../../assets/images/InvenTrack/dashboard_prescriptive_analytics.png',
                alt: 'InvenTrack Prescriptive Analytics Dashboard'
            }
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Key Features</h3><p class="mb-4">Focused on meaningful functionality that directly addresses inventory management needs:</p><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Centralized Inventory Database:</strong> Single source of truth for all GSO inventory operations, eliminating data fragmentation across multiple spreadsheets</li><li><strong>Real-Time Stock Monitoring:</strong> Live tracking of stock levels and item availability, providing instant visibility into inventory status</li><li><strong>Request and Approval Workflow:</strong> Streamlined process for inventory requests with automated approval routing, reducing processing delays</li><li><strong>Analytics-Supported Summaries:</strong> Comprehensive inventory summaries with historical usage analysis, enabling data-driven insights for planning</li><li><strong>System-Generated Recommendations:</strong> Prescriptive analytics provide guidance for restocking decisions and resource planning based on usage patterns</li><li><strong>Role-Based Access Control:</strong> Secure access management for administrators and staff, ensuring appropriate permissions and data security</li><li><strong>Automated Reporting:</strong> System-generated reports for inventory status and planning, eliminating manual report creation and ensuring consistency</li></ul>'
            },
            {
                type: 'image',
                src: '../../assets/images/InvenTrack/inventory_category.png',
                alt: 'InvenTrack Inventory Category'
            },
            {
                type: 'image',
                src: '../../assets/images/InvenTrack/inventories_category_drugs.png',
                alt: 'InvenTrack Inventory Category - Drugs'
            }
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Tech Stack</h3><div class="mb-4"><p class="mb-2"><strong>Frontend:</strong> ReactJS, Tailwind CSS</p><p class="mb-2">ReactJS provides a component-based architecture for building responsive, interactive user interfaces. Tailwind CSS enables rapid UI development with utility-first styling, ensuring consistent design and efficient development workflow.</p></div><div class="mb-4"><p class="mb-2"><strong>Backend:</strong> Node.js / Express</p><p class="mb-2">Node.js with Express framework provides a scalable server-side solution for handling API requests, business logic, and integration with the database layer.</p></div><div class="mb-4"><p class="mb-2"><strong>Database:</strong> PostgreSQL</p><p class="mb-2">PostgreSQL offers robust relational database capabilities for structured inventory data, providing reliable storage and efficient querying for inventory records, historical usage patterns, and system-generated recommendations.</p></div><div class="mb-4"><p class="mb-2"><strong>Analytics Processing:</strong> SQL and TensorFlow.js</p><p class="mb-2">SQL enables efficient querying and analysis of historical inventory data, while TensorFlow.js provides prescriptive analytics capabilities for generating machine learning-powered recommendations and insights directly in the browser or Node.js environment.</p></div><p class="mb-2"><strong>Tools:</strong> Git, Figma</p>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Results & Impact</h3><div class="mb-4"><h4 class="font-semibold mb-2">Operational Improvements:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Improved Inventory Transparency:</strong> Centralized platform provides clear visibility into stock levels, item movement, and inventory status across all GSO operations</li><li><strong>Reduced Manual Errors:</strong> Automated tracking and data entry processes eliminate human errors associated with spreadsheet-based record-keeping</li><li><strong>Enhanced Decision-Making:</strong> Analytics-driven insights and system-generated recommendations enable more informed decisions about restocking, procurement, and resource allocation</li><li><strong>Faster Request Processing:</strong> Streamlined workflow reduces delays in inventory request handling and approval processes</li></ul></div><div class="mb-4"><h4 class="font-semibold mb-2">Strategic Benefits:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Minimized Stock Shortages:</strong> Real-time monitoring and predictive analytics help prevent inventory shortages by identifying restocking needs proactively</li><li><strong>Avoided Overstocking:</strong> Historical usage analysis and recommendations prevent unnecessary inventory accumulation, optimizing resource utilization</li><li><strong>Enhanced Procurement Planning:</strong> Data-driven insights support better forecasting and planning for inventory purchases, improving budget efficiency</li><li><strong>Overall Efficiency Improvement:</strong> Integrated system reduces administrative overhead and improves overall efficiency in inventory management operations</li></ul></div><p class="mb-4"><strong>Impact Statement:</strong> INVENTRACK supports the General Services Office by improving inventory transparency, reducing manual errors, and enabling more informed decision-making. Through analytics-driven insights and recommendations, the system helps minimize stock shortages, avoid overstocking, and enhance overall efficiency in inventory management and procurement planning.</p>'
            }
        ]
    },
    {
        id: 1,
        title: 'SoundSprint',
        subtitle: 'An educational mobile game application that addresses the gap in interactive audio-based learning, helping users develop auditory recognition skills, music appreciation, and language comprehension through gamified experiences.',
        category: 'Mobile Development',
        url: 'https://example.com/soundsprint',
        image: '../../assets/images/SoundSprint/Home_page.jpg',
        additionalContent: [
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Project Overview</h3><p class="mb-4">Traditional educational apps often lack engaging audio-based learning experiences, leaving learners with limited opportunities to develop auditory recognition skills and music appreciation. Many existing solutions focus primarily on visual or text-based learning, neglecting the importance of audio comprehension in cognitive development.</p><p class="mb-4"><strong>Who experiences the problem?</strong></p><ul class="list-disc list-inside space-y-2 mb-4"><li>Students and learners seeking interactive educational content</li><li>Individuals wanting to improve audio recognition and music identification skills</li><li>Language learners needing vocabulary building through engaging methods</li><li>Educators looking for accessible, offline-capable learning tools</li></ul>'
            },
            {
                type: 'image',
                src: '../../assets/images/SoundSprint/Home_page.jpg',
                alt: 'SoundSprint Home Page'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Problem Statement</h3><p class="mb-4">The current educational technology landscape faces several inefficiencies in audio-based learning:</p><div class="mb-4"><h4 class="font-semibold mb-2">Key Inefficiencies:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Time Delays:</strong> Learners struggle to find consolidated platforms that combine multiple learning modalities (audio, visual, text) in one place</li><li><strong>Human Error:</strong> Manual tracking of learning progress leads to inconsistent skill development and difficulty in identifying areas for improvement</li><li><strong>Data Inconsistency:</strong> Lack of unified progress tracking across different learning activities makes it difficult to measure educational outcomes</li><li><strong>Lack of Visibility:</strong> Learners and educators have limited insight into performance metrics, making it challenging to adapt learning strategies</li><li><strong>Accessibility Barriers:</strong> Many educational apps require constant internet connection, excluding users in areas with limited connectivity</li></ul></div><p class="mb-4"><strong>Consequences:</strong> Reduced engagement in audio-based learning, slower skill development, and limited accessibility for diverse learner populations.</p>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Proposed Solution</h3><p class="mb-4">SoundSprint addresses these challenges through a comprehensive, gamified learning platform that automates progress tracking, provides real-time performance analytics, and supports offline learning capabilities.</p><div class="mb-4"><h4 class="font-semibold mb-2">How the System Solves the Problem:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Automation:</strong> Automated progress tracking eliminates manual record-keeping, ensuring consistent data collection across all learning activities</li><li><strong>Data Accuracy:</strong> Real-time performance metrics provide accurate insights into learner progress, identifying strengths and areas needing improvement</li><li><strong>Real-time Access:</strong> Immediate feedback system allows learners to understand their performance instantly, enabling adaptive learning strategies</li><li><strong>Decision Support:</strong> Comprehensive analytics dashboard helps learners and educators make data-driven decisions about learning paths and difficulty adjustments</li></ul></div><p class="mb-4"><strong>Why it\'s better:</strong> Unlike traditional educational apps, SoundSprint combines multiple learning modalities (audio recognition, music identification, vocabulary building) in a single, cohesive platform with offline capabilities, making it accessible to a wider range of learners regardless of their internet connectivity.</p>'
            },
            {
                type: 'image',
                src: '../../assets/images/SoundSprint/Game_Category_page.jpg',
                alt: 'SoundSprint Game Category Selection'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Key Features</h3><p class="mb-4">Focused on meaningful functionality that directly addresses learning needs:</p><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Multi-Modal Learning System:</strong> Five distinct game modes (Audio Recognition, Music Identification, True/False, Vocabulary, Image Recognition) providing diverse learning pathways</li><li><strong>Adaptive Difficulty System:</strong> Progressive difficulty levels (Easy, Medium, Hard) with configurable timers, allowing personalized learning experiences based on skill level</li><li><strong>Real-Time Performance Analytics:</strong> Comprehensive statistics dashboard tracking user performance metrics, enabling data-driven learning decisions</li><li><strong>Automated Progress Tracking:</strong> System automatically records and analyzes learning patterns, eliminating manual tracking errors</li><li><strong>Offline-First Architecture:</strong> Core functionality works without internet connection, ensuring accessibility for users with limited connectivity</li><li><strong>Age-Appropriate Content Personalization:</strong> Onboarding flow with age categorization ensures content and difficulty scaling match learner capabilities</li><li><strong>Accessibility Support:</strong> Screen reader support, high contrast modes, and audio descriptions make the platform inclusive for diverse learners</li></ul>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Tech Stack</h3><div class="mb-4"><p class="mb-2"><strong>Frontend:</strong> Flutter</p><p class="mb-2">Flutter was chosen for cross-platform compatibility, allowing the app to run seamlessly on both iOS and Android devices with a single codebase. This ensures consistent user experience across different platforms while reducing development and maintenance overhead.</p></div><div class="mb-4"><p class="mb-2"><strong>State Management:</strong> Provider / Riverpod</p><p class="mb-2">Used for efficient state management and real-time UI updates based on user interactions and game progress.</p></div><div class="mb-4"><p class="mb-2"><strong>Local Storage:</strong> SharedPreferences / Hive</p><p class="mb-2">Enables offline functionality by storing user progress, achievements, and game data locally on the device.</p></div><div class="mb-4"><p class="mb-2"><strong>Audio Management:</strong> Audio Players / Just Audio</p><p class="mb-2">Handles audio playback for sound recognition games and music identification features with precise control over playback timing.</p></div><p class="mb-2"><strong>Tools:</strong> Git, Figma, Firebase (for cloud sync when available)</p>'
            },
            {
                type: 'image',
                src: '../../assets/images/SoundSprint/Gameplay_sample.jpg',
                alt: 'SoundSprint Gameplay Sample'
            },
            {
                type: 'image',
                src: '../../assets/images/SoundSprint/Quiz_Result_page.jpg',
                alt: 'SoundSprint Quiz Results Page'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Results & Impact</h3><div class="mb-4"><h4 class="font-semibold mb-2">Educational Outcomes:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Improved Learning Engagement:</strong> Gamified approach increases user motivation and time spent on learning activities compared to traditional educational methods</li><li><strong>Enhanced Skill Development:</strong> Multi-modal learning system (audio, visual, text) improves retention rates and cognitive skill development across different learning domains</li><li><strong>Reduced Learning Barriers:</strong> Offline-first architecture eliminates connectivity barriers, making quality educational content accessible to users in areas with limited internet access</li><li><strong>Data-Driven Learning:</strong> Real-time analytics enable learners to identify improvement areas and track progress, leading to more effective learning strategies</li></ul></div><div class="mb-4"><h4 class="font-semibold mb-2">System Efficiency:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Automated Progress Tracking:</strong> Eliminates manual record-keeping errors and provides consistent, accurate performance data</li><li><strong>Real-Time Feedback:</strong> Immediate performance insights reduce the time between learning activities and understanding outcomes, enabling faster skill development</li><li><strong>Personalized Learning Paths:</strong> Adaptive difficulty system ensures learners are challenged appropriately, reducing frustration and maximizing learning efficiency</li></ul></div><p class="mb-4"><strong>Impact Statement:</strong> SoundSprint addresses the gap in interactive audio-based learning by providing a comprehensive, accessible platform that combines multiple learning modalities. The system\'s automated tracking, real-time analytics, and offline capabilities make quality educational content available to a wider range of learners, ultimately improving engagement and skill development in audio recognition, music appreciation, and language comprehension.</p>'
            }
        ]
    },
    {
        id: 2,
        title: 'EmpowerPWD',
        subtitle: 'A job portal connecting Persons with Disabilities (PWDs) to inclusive employment opportunities, addressing employment barriers and promoting financial independence through accessible job matching.',
        category: 'Web Development',
        url: 'https://example.com/empowerpwd',
        image: '../../assets/images/EmpowerPWD/empowerPWD.png',
        additionalContent: [
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Project Overview</h3><p class="mb-4">Persons with Disabilities (PWDs) face significant challenges in finding employment due to prevalent biases and discrimination in the job market. Despite having skills and talents that often surpass their non-disabled counterparts, many PWDs struggle to find job opportunities that align with their capabilities.</p><p class="mb-4"><strong>Who experiences the problem?</strong></p><ul class="list-disc list-inside space-y-2 mb-4"><li>Persons with Disabilities (PWDs) seeking meaningful employment opportunities</li><li>Employers looking to build diverse and inclusive workforces</li><li>PWDs motivated to secure employment to support their families and contribute to communities</li></ul>'
            },
            {
                type: 'image',
                src: '../../assets/images/EmpowerPWD/empowerPWD_landing_1.png',
                alt: 'EmpowerPWD Landing Page'
            },
            {
                type: 'image',
                src: '../../assets/images/EmpowerPWD/empowerPWD_landing_2.png',
                alt: 'EmpowerPWD Landing Page Section 2'
            },
            {
                type: 'image',
                src: '../../assets/images/EmpowerPWD/empowerPWD_landing_3.png',
                alt: 'EmpowerPWD Landing Page Section 3'
            }
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Problem Statement</h3><p class="mb-4">The job market presents several barriers for Persons with Disabilities:</p><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Employment Barriers:</strong> Prevalent biases and discrimination prevent PWDs from accessing job opportunities despite their qualifications</li><li><strong>Lack of Awareness:</strong> Many employers are unaware of the benefits of hiring PWDs and the unique skills they bring to the workforce</li><li><strong>Limited Access:</strong> PWDs struggle to find job opportunities that match their capabilities and accommodate their needs</li><li><strong>Societal Stigma:</strong> Negative perceptions and practices create barriers that hinder PWDs from pursuing meaningful work</li></ul><p class="mb-4"><strong>Consequences:</strong> Lower employment rates among PWDs, reduced financial independence, and missed opportunities for businesses to access a diverse pool of valuable employees.</p>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Proposed Solution</h3><p class="mb-4">EmpowerPWD bridges the gap between PWDs and potential employers through a job portal that connects Persons with Disabilities with inclusive employment opportunities.</p><div class="mb-4"><h4 class="font-semibold mb-2">How the System Solves the Problem:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Job Matching:</strong> Connects PWD job seekers with inclusive employers, ensuring equal access to job opportunities</li><li><strong>Employer Awareness:</strong> Helps businesses understand the benefits of hiring PWDs and access to diverse talent pools</li><li><strong>Skill-Based Matching:</strong> Matches PWDs with opportunities that align with their unique skills and qualifications</li><li><strong>Inclusive Environment:</strong> Fosters a job market where talent is valued regardless of disability</li></ul></div><p class="mb-4"><strong>Why it\'s better:</strong> Unlike traditional job portals, EmpowerPWD specifically addresses the employment needs of PWDs while educating employers about inclusive hiring practices, creating a supportive environment where talent is recognized and valued regardless of disability.</p>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Key Features</h3><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Job Matching System:</strong> Connects PWD job seekers with inclusive employers based on skills and qualifications</li><li><strong>Employer Portal:</strong> Platform for businesses to post inclusive job opportunities and access diverse talent</li><li><strong>PWD Profile Management:</strong> Allows PWDs to showcase their skills, qualifications, and unique capabilities</li><li><strong>Accessibility Features:</strong> Platform designed with accessibility in mind to ensure equal access for all users</li><li><strong>Employer Education:</strong> Resources and information about the benefits of hiring PWDs and inclusive practices</li><li><strong>Application Management:</strong> Streamlined process for job applications and employer responses</li></ul>'
            },
            {
                type: 'image',
                src: '../../assets/images/EmpowerPWD/empowerPWD_aboutus.png',
                alt: 'EmpowerPWD About Us Page'
            }
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Tech Stack</h3><div class="mb-4"><p class="mb-2"><strong>Frontend:</strong> React</p><p class="mb-2">React provides a component-based architecture for building accessible, responsive user interfaces for both job seekers and employers, ensuring a seamless user experience.</p></div><div class="mb-4"><p class="mb-2"><strong>Backend:</strong> Node.js / Express</p><p class="mb-2">Node.js with Express framework handles job matching logic, user authentication, and API endpoints for efficient data management and server-side operations.</p></div><div class="mb-4"><p class="mb-2"><strong>Database:</strong> MongoDB</p><p class="mb-2">MongoDB stores user profiles, job listings, and application data, providing flexible document-based storage that accommodates the diverse data structures needed for the job portal.</p></div><p class="mb-2"><strong>Tools:</strong> Git</p>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Results & Impact</h3><div class="mb-4"><h4 class="font-semibold mb-2">Employment Outcomes:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Increased Employment Rates:</strong> Connects PWDs with job opportunities, helping them secure meaningful employment</li><li><strong>Financial Independence:</strong> Enables PWDs to achieve greater financial independence through employment</li><li><strong>Improved Quality of Life:</strong> Employment opportunities enhance overall well-being and community contribution</li><li><strong>Employer Awareness:</strong> Raises business awareness of the benefits of hiring PWDs and diverse workforces</li></ul></div><div class="mb-4"><h4 class="font-semibold mb-2">Social Impact:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>SDG 8 - Decent Work and Economic Growth:</strong> Promotes inclusive employment, ensuring equal access to work and contributing to economic growth through workforce diversity</li><li><strong>SDG 10 - Reduced Inequalities:</strong> Addresses employment barriers faced by marginalized groups, advocating for diversity and inclusion in the job market</li><li><strong>Promoting Inclusivity:</strong> Fosters a job market where talent is valued regardless of disability, creating a more equitable employment landscape</li></ul></div><p class="mb-4"><strong>Impact:</strong> EmpowerPWD bridges the employment gap for Persons with Disabilities by connecting them with inclusive employers, promoting financial independence, and contributing to a more diverse and inclusive workforce. The platform supports PWDs in achieving meaningful employment while helping businesses access valuable talent, ultimately working towards reduced inequalities and sustainable economic growth.</p>'
            }
        ]
    },
    {
        id: 3,
        title: 'Spartan Odyssey',
        subtitle: 'A gamified educational game designed to improve SQL programming skills for IT students through narrative-driven challenges and progressive learning levels, addressing the gap between traditional programming education and engaging learning experiences.',
        category: 'Web Development',
        url: 'https://example.com/spartan-odyssey',
        image: '',
        additionalContent: [
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Project Overview</h3><p class="mb-4">Gamification in education has emerged as an effective method to increase student engagement and learning outcomes. Research demonstrates that gamified educational components improve student performance and satisfaction in computer science courses.</p><p class="mb-4"><strong>Who experiences the problem?</strong></p><ul class="list-disc list-inside space-y-2 mb-4"><li>IT students at Batangas State University struggling with SQL programming concepts</li><li>Students losing interest due to course difficulty and traditional teaching methods</li><li>Learners unable to connect academic coursework with real-world applications</li></ul>'
            },
            {
                type: 'image',
                src: '../../assets/images/SpartanOddessy/webpage_spartan-oddsessy.png',
                alt: 'Spartan Odyssey Webpage'
            }
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Problem Statement</h3><p class="mb-4">Traditional SQL programming education faces several challenges:</p><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Difficulty and Loss of Interest:</strong> Students struggle with SQL concepts, leading to decreased motivation</li><li><strong>Lack of Engagement:</strong> Traditional teaching methods fail to maintain student interest and consistent practice</li><li><strong>Disconnect from Real-World:</strong> Students cannot see how academic coursework relates to industry applications</li><li><strong>No Immediate Feedback:</strong> Traditional methods don\'t provide instant feedback on coding errors</li></ul><p class="mb-4"><strong>Consequences:</strong> Reduced motivation, slower skill development, and decreased interest in pursuing advanced programming studies.</p>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Proposed Solution</h3><p class="mb-4">Spartan Odyssey addresses these challenges through a gamified platform that blends education and gaming, guiding students on a coding journey to improve SQL programming skills.</p><div class="mb-4"><h4 class="font-semibold mb-2">How the System Solves the Problem:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Narrative-Driven Learning:</strong> Engaging storyline with SQL coding puzzles that advance the plot, creating connection between learning and entertainment</li><li><strong>Progressive Skill Levels:</strong> Levels designed to introduce and reinforce SQL principles, progressing from basic to advanced concepts</li><li><strong>Targeted SQL Practice:</strong> Hands-on coding assignments tailored for BSU students enrolled in database courses</li><li><strong>Immediate Feedback:</strong> Real-time feedback on coding challenges enables instant learning from mistakes</li></ul></div><p class="mb-4"><strong>Why it\'s better:</strong> Unlike traditional methods, Spartan Odyssey transforms SQL learning from passive theory into an interactive, narrative-driven experience that maintains student interest while building practical database skills.</p>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Key Features</h3><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Narrative-Driven SQL Learning:</strong> Storyline with SQL coding puzzles that advance the plot</li><li><strong>Progressive Skill Levels:</strong> Levels introducing SQL principles from basic to advanced</li><li><strong>Targeted SQL Practice:</strong> Hands-on coding assignments for BSU database course students</li><li><strong>Immediate Feedback:</strong> Real-time feedback on SQL coding challenges</li><li><strong>Gamification Elements:</strong> Points, badges, and leaderboards for progress tracking and competition</li><li><strong>SQL-Focused Content:</strong> Primary focus on SQL (with future plans for Python and Java)</li></ul>'
            },
            {
                type: 'image',
                src: '../../assets/images/SpartanOddessy/Game_1.png',
                alt: 'Spartan Odyssey Gameplay 1'
            },
            {
                type: 'image',
                src: '../../assets/images/SpartanOddessy/Game_2.png',
                alt: 'Spartan Odyssey Gameplay 2'
            },
            {
                type: 'image',
                src: '../../assets/images/SpartanOddessy/Game_3.png',
                alt: 'Spartan Odyssey Gameplay 3'
            }
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Tech Stack</h3><div class="mb-4"><p class="mb-2"><strong>Game Engine:</strong> Godot</p><p class="mb-2">Godot provides the framework for creating interactive gameplay, managing game states, and handling user interactions in the educational gaming environment.</p></div><div class="mb-4"><p class="mb-2"><strong>Programming Language:</strong> GDScript</p><p class="mb-2">GDScript is used for game logic, educational content delivery, and integration of SQL programming challenges within the game environment.</p></div><div class="mb-4"><p class="mb-2"><strong>Database:</strong> SQLite</p><p class="mb-2">SQLite stores game progress, user data, and SQL challenge content, providing efficient local data management for the educational game.</p></div><p class="mb-2"><strong>Tools:</strong> Git, Godot Editor</p>'
            },
            {
                type: 'text',
                content: '<h3 class="text-xl font-semibold mb-3">Results & Impact</h3><div class="mb-4"><h4 class="font-semibold mb-2">Educational Outcomes:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Improved SQL Skills:</strong> Increased student engagement and practice time leads to better database concept understanding</li><li><strong>Enhanced Problem-Solving:</strong> Interactive SQL challenges improve logical thinking about data relationships</li><li><strong>Increased Motivation:</strong> Entertainment elements maintain interest and prevent boredom</li><li><strong>Reduced Difficulty Perception:</strong> Gamification makes SQL learning more approachable</li></ul></div><div class="mb-4"><h4 class="font-semibold mb-2">Strategic Benefits:</h4><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Career Inspiration:</strong> Motivates BSU IT students to pursue game development and programming studies</li><li><strong>Real-World Connection:</strong> Narrative approach helps students see SQL\'s practical applications</li><li><strong>Targeted Support:</strong> Content tailored for BSU students in SQL/database courses</li><li><strong>Future Expansion:</strong> SQL-focused foundation with plans for Python and Java</li></ul></div><p class="mb-4"><strong>Impact:</strong> Spartan Odyssey addresses the gap in engaging SQL education by providing a gamified platform that combines learning with entertainment. The narrative-driven approach and progressive skill levels help improve SQL programming skills while maintaining student interest, ultimately bridging the connection between academic studies and industry application.</p>'
            }
        ]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PROJECTS_DATA;
}

