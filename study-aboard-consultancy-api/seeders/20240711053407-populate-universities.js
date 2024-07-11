'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Universities', [
      {
        university_name: 'National College of Ireland',
        university_shortname: 'NCI',
        university_description: 'The National College of Ireland is situated in Dublin, Ireland. More than 5,000 students at the National College of Ireland study various undergraduate and postgraduate courses in Business, Computing, Marketing, Data Analytics, Human Resources, Cybersecurity, and others.The tuition fee for undergraduate, masters and higher diploma is 10,000 EUR, 15,000 EUR, and 12,000 EUR, respectively.The college offers financial aid to international students under programs like Higher Diploma Scholarship (4,000 EUR), Entrepreneur Scholarship (50% of tuition fees), NCI Presidents Award (3,000 EUR), Undergraduate Scholarships (2,000 EUR), Women in Business Scholarships (50% of tuition fees), etc.With a 96% employment rate, graduates from the National College of Ireland get placed or pursue higher studies within six months of the degree.Due to its location in the International Financial Services Centre, students gain an average annual package between 55,000 USD and 75,000 USD in companies like JP Morgan, Facebook, Google, LinkedIn, etc.',
        university_program_intake: 'JAN & SEP',
        university_program_intake_status: 'OPEN',
        university_created_at: new Date(),
        university_updated_at: new Date()
      },
      {
        university_name: 'Dublin Business School',
        university_shortname: 'DBS',
        university_description: 'Founded in 1975, Dublin Business School (earlier known as Accountancy and Business College) is an independent college in Dublin, Ireland. It is spread across six locations on Aungier Street (Main campus), Dame Street, Balfe Street, and South Great Georges Street. The three schools- Professional School, School of Business and Law, and School of Arts offer full-time and part-time learning programs with an opportunity to study in state-of-the-art buildings, the latest laboratories, and 24/7 access to libraries. Apart from joining 30+ sports clubs regarding cricket, football, and basketball, students can also participate in various societies like law, computer, psychology, debate, fashion, etc.With more than 100 courses (70 for international students), Dublin Business School provides undergraduate and postgraduate courses in Arts, Information Technology, Accounting and Finance, Law, Journalism, and many more. The annual tuition fee for undergraduate and postgraduate courses is 9,800 EUR and 13,500 EUR, respectively, along with an admission fee of 50 EUR. International students can get additional financial support from Dublin Business School through partial scholarships of 500 EUR for Level 6, Level 7, and Level 8 programmes and 1000 EUR for Level 9 courses. Also, you can be eligible for the Refer a Friend scheme to get 500 EUR (Ireland student) and 300 EUR (Overseas student). Student apartments and host family accommodation (privately owned) are provided at convenient locations from the main campus. Within walking distance from DBS, residences like Point Campus in Point Village have single, double, cluster, and ensuite room options at an average rent of 600 EUR- 1,100 EUR per month. Amenities like washing machines, free internet access, standard rooms, study space, bike storage, launderette, and security are included. The DBS Careers and Appointment Service organizes several events regularly to assist students in developing intellectual skills. Graduates from Dublin Business School can get placement with an average salary of 47,000 USD to 72,000 USD per year.',
        university_program_intake: 'JAN & SEP',
        university_program_intake_status: 'OPEN',
        university_created_at: new Date(),
        university_updated_at: new Date()
      },
      {
        university_name: 'Maynooth University',
        university_shortname: 'MU',
        university_description: 'Maynooth University (MU) is a constituent of the National University of Ireland in Maynooth, County Kildare, located 25 km from Dublin, Ireland. The university has two connected northern and southern campuses. Maynooth University houses over 13,000 students and 900 staff from more than 20 different countries. The university offers 235 UG and PG level courses in its 26 departments and three faculties. The most popular courses are in streams such as Social Science, Humanities, and Natural Sciences. Several research universities fall under MU, including the Irish Climate Analysis and Research Units (ICARUS), Institute of Immunology, National Institute for Regional and Spatial Analysis, The Callan Institute, and the National Centre for Geocomputation. MU provides on-campus accommodations for full-time registered students in their five residences: The Courtyard Plaza, The Courtyard Apartment, The River Apartment, The Village Apartment, and The Rye Hall. Students can choose from over 100 student clubs and societies, such as rugby, badminton, tennis, surfing, canoeing, archery, and kayaking.Maynooth University has strong ties to the industry, including giants like Google, Microsoft, Facebook, IBM, Intel, HP, Coca-Cola, Cadbury, Goldman Sachs, Loreal, and Unilever.The average annual tuition fee for undergraduate programs is about USD 13,700, and that for postgraduate programs is approximately USD 14,800. MU offers more than 60 scholarships for students seeking financial assistance, including the MU Entrance Scholarships, MU Sports Scholarships, and the Google Women Techmakers Undergraduate Scholar Award worth USD 1000.',
        university_program_intake: 'JAN & SEP',
        university_program_intake_status: 'OPEN',
        university_created_at: new Date(),
        university_updated_at: new Date()
      },
      {
        university_name: 'Griffith College - Dublin',
        university_shortname: 'GCD',
        university_description: 'Established in 1974, Griffith College is a third-level private educational institute in Dublin, Ireland. All three campuses- Dublin (main campus), Cork, and Limerick have high-tech infrastructures.The significant faculties at Griffith College are the Faculty of Journalism and Media Communications, Faculty of Teaching and Learning, Faculty of Design, Faculty of Business, Faculty of Engineering, Faculty of Professional Accountancy, Faculty of Law, Faculty of Lifelong Learning, Faculty of Music and Multimedia, Faculty of Pharmaceutical Science, Faculty of Professional Law, Faculty of Counselling & Psychotherapy, Faculty of Computing.More than 7,400 students are enrolled in 190+ undergraduate, postgraduate, international, professional, and short-term courses with part-time, full-time, blended, and online learning options. Students with IELTS and TOEFL certifications can fill out the online application form with an Academic Administration fee of 250 EUR.The tuition fee for postgraduate and undergraduate courses is 14,000 EUR and 12,000 EUR, respectively. Along with an application fee of 300 EUR, the average per night charges are 23- 46 EUR. Off-campus accommodation is available at an average monthly rent of 500- 700 EUR. The college also offers two types of financial support: Griffith College Dublin Bursary and Academic Merit Scholarship to international students. Griffith College provides placement assistance to students who can back an annual salary of 45,000- 65,000 USD.',
        university_program_intake: 'JAN & SEP',
        university_program_intake_status: 'OPEN',
        university_created_at: new Date(),
        university_updated_at: new Date()
      },
      {
        university_name: 'Dublin City University',
        university_shortname: 'DCU',
        university_description: 'Established in 1989, Dublin City University is a renowned international university located in Dublin, Ireland. All five campuses in Glasnevin (DCU Glasnevin Campus, DCU Alpha Innovation Campus, DCU Sports Campus) and Drumcondra (DCU St. Patricks Campus, DCU All Hallows Campus) are within a 3 kilometers radius of each other connected with public transport facilities. The university is divided into five faculties, Faculty of Science and Health, Faculty of Humanities & Social Science, Faculty of Engineering and Computing, DCU Institute of Business, and DCU Institute of Education.Additional facilities at the university include the Sports Pavilion, Inter Faith Center with medical and counselling service center, Church of Ireland Center, DCU Library with over 100 online databases, sound studios, computer labs, The Helix with Mahony Hall, six restaurants, a beauty salon, and general stores.Dublin City University houses more than 7,400 students pursuing over 200 postgraduate and undergraduate degree courses in Business, Health, Sciences, Engineering, and Humanities. Students can apply in Fall and Spring intakes after scoring minimum English proficiency grades in IELTS (6.5), TOEFL (92), PRE (63), along with an application fee of 50 EUR.The tuition fees per module for undergraduate programs is 900 EUR (for EU Students) and 1,280 EUR (for International students) while postgraduate courses cost 1,880 EUR (for EU Students) and 2,880 EUR (for international students). The university provides financial aid to students under Academic Scholarship Programme (up to 500 EUR), Merit Scholarship Program (up to 2,000 EUR), Sports Scholarship, etc.The on-campus accommodation facilities are given in residential buildings like Hampstead Apartments, and College Park Apartments with 4-5 shared bedroom options. The total expenditure of 6,150 EUR includes services like a kitchen, living room, free Wi-Fi, parking, ATM, laundry, and many more. Dublin City University enhances employment for graduates through pre-placement sessions to help them get annual salaries between 70,000 USD and 105,000 USD in companies like Dell, Google, eBay, Intel, etc',
        university_program_intake: 'JAN & SEP',
        university_program_intake_status: 'OPEN',
        university_created_at: new Date(),
        university_updated_at: new Date()
      },
      {
        university_name: 'Trinity College Dublin',
        university_shortname: 'TCD',
        university_description: 'Founded in 1592, Trinity College Dublin is one of the oldest institutes in Ireland. Trinity College has over 18,000 students from more than 122 countries and offers over 600 undergraduate, postgraduate, short courses, and online programs. The college is highly acclaimed for its Law, Literature and Humanities, health sciences, and STEM programs.Trinity College Dublin has a competitive acceptance rate of 34% and accepts applications through the online application portal, with an application fee of 55 EUR. Academic transcripts, IELTS/TOEFL scores, Letters of Recommendation, and course-specific CV/resume must also be submitted. The college is spread across 51 acres and is known for its Georgian architecture, museums, art galleries, and theatres.With more than 6 million printed volumes, Trinity Library is the most extensive library in Ireland. Trinity College also houses the institutes Business School, Science Gallery, the Long Room Hub Institute for Arts and Humanities, The Lir Academy for Dramatic Art, the nanoscience research center (CRANN), and the Biomedical Sciences Institute. The annual tuition fee ranges from USD 28,000 to 56,000.There are many options for availing of financial aid, some of which are the Global Business Scholarship and Postgraduate Research Scholarship. The government of Ireland Scholarship offers a 100% tuition fee waiver. Students can seek accommodation at The Trinity Hall with a capacity of over 1,000 students in shared, single, or twin apartments or at Kavanagh Court and Binary Hub.The average price of rooms is USD 205 per week. The average annual cost of living can be up to USD 13,800. Trinity College students can choose from over 170 societies and sports clubs, including hockey, rowing, investing, advocacy, animation, and zoology. Trinity College has a more than 92% employment rate. With its location in Irelands Silicon Valley, Trinity College students find employment opportunities from companies such as Google, Facebook, Microsoft, PayPal, LinkedIn, Airbnb, and eBay.',
        university_program_intake: 'JAN & SEP',
        university_program_intake_status: 'OPEN',
        university_created_at: new Date(),
        university_updated_at: new Date()
      },
      {
        university_name: 'Dundalk Institute of Technology',
        university_shortname: 'DIT',
        university_description: 'Dundalk Institute of Technology (DkIT) was founded as the Dundalk Regional Technical College in County Louth, Ireland. With about 4,500 students and 500 full-time staff, DkIT offers several undergraduate, postgraduate, and research courses in its four schools, namely the School of Business & Humanities, School of Engineering, School of Informatics & Creative Arts, and School of Health & Science. The popular courses include those in Accounting, Engineering, and Law. Students must produce proof of their English proficiency by submitting IELTS/TOEFL scores. The minimum requirements of these courses vary from course to course.The average annual tuition fee across different courses ranges from 10,000-15000 EUR. Students can apply for scholarships, such as the ABP Agri-Food Student Bursary, DkIT Sports Scholarships, Servisource Nursing Scholarship, and Academic Merit-based scholarships.More than 55% of the courses at DkIT have opportunities for work placement. Over 89% of the DkIT graduates find employment or are engaged in further studies within nine months of graduating.',
        university_program_intake: 'JAN & SEP',
        university_program_intake_status: 'OPEN',
        university_created_at: new Date(),
        university_updated_at: new Date()
      },
      {
        university_name: 'University of Limerick',
        university_shortname: 'UL',
        university_description: 'University of Limerick (UL) was founded in 1972 as the National Institute for Higher Education, located in Limerick, Ireland. UL houses over 11,000 full-time students and 1,300 staff members. The university has four faculties, Kemmy Business School, Faculty of Education and Health Sciences, Faculty of Science and Engineering, and the Faculty of Arts, Humanities, and Social Sciences. UL offers more than 70 UG and 100 PG courses at doctoral and postdoctoral levels. As part of their degree, the students are offered an eight-month work placement with one of the 1,700 cooperative employers associated with the university. Annually, more than 2,000 students secure placements in industry, public service, and commerce.On-campus accommodation is provided to students in 2,500 rooms across six student villages and can cost up to EUR 4,500 annually. The total average cost of living for University of Limerick students can be up to EUR 10,500 per year. The University of Limerick is known for its cooperative education programs. The University of Limerick accepts applications online for an application fee of 35 EUR. The general documents needed are the official academic transcripts, mark sheets, degree completion certificate, and English language certificate. The average annual fee for various courses may range from EUR 11,500 to 43,000. Students can avail of financial aid through the Faculty of Science & Engineering Scholarships, Kemmy Business School International Scholarships, and the Faculty of Arts, Humanities & Social Sciences Scholarships.',
        university_program_intake: 'JAN & SEP',
        university_program_intake_status: 'OPEN',
        university_created_at: new Date(),
        university_updated_at: new Date()
      },
      {
        university_name: 'University of Galway',
        university_shortname: 'UG',
        university_description: 'The University of Galway was established in 1845 and is a member of the Coimbra Group, a network of 40 long-established European universities. Business/Commerce to include a number of quantitative subjects such as Economics or Finance. A quantitative-based degree such as Engineering, Mathematics, Physics and Economics. Applicants should have demonstrated strong academic ability (a H1 or H2.1, or equivalent) in a number of quantitative modules in their degree such as mathematics, statistics or econometrics. 65% (60% from Delhi/Mumbai/Pune Universities)',
        university_program_intake: 'JAN & SEP',
        university_program_intake_status: 'OPEN',
        university_created_at: new Date(),
        university_updated_at: new Date()
      },
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Universities', null, {});
  }
};
