// Örnek veri. Gerçek veriyle değiştir (veya bir API'den çek).
// cat: "STEM" | "Humanities" — funding: "Fully funded" | "Funding available" | "Competitive"
const PROGRAMS = [
  { name:"Stanford University", country:"USA", city:"Stanford, CA", qs:3, program:"PhD in Computer Science", field:"Computer Science", cat:"STEM", funding:"Funding available", start:"Fall 2027", url:"https://www.stanford.edu", color:"#8c1515" },
  { name:"University of Oxford", country:"UK", city:"Oxford, UK", qs:4, program:"PhD in History", field:"History", cat:"Humanities", funding:"Funding available", start:"Fall 2027", url:"https://www.ox.ac.uk", color:"#002147" },
  { name:"TU Munich", country:"Germany", city:"Munich, DE", qs:49, program:"PhD in Mechanical Engineering", field:"Engineering", cat:"STEM", funding:"Fully funded", fundNote:"DAAD", start:"Spring 2027", url:"https://www.tum.de", color:"#0065bd" },
  { name:"University of Toronto", country:"Canada", city:"Toronto, CA", qs:34, program:"PhD in Physics", field:"Physics", cat:"STEM", funding:"Competitive", start:"Fall 2027", url:"https://www.utoronto.ca", color:"#1e3765" },
  { name:"MIT", country:"USA", city:"Cambridge, MA", qs:1, program:"PhD in Electrical Engineering", field:"Engineering", cat:"STEM", funding:"Fully funded", start:"Fall 2027", url:"https://www.mit.edu", color:"#a31f34" },
  { name:"University of Cambridge", country:"UK", city:"Cambridge, UK", qs:5, program:"PhD in Philosophy", field:"Philosophy", cat:"Humanities", funding:"Competitive", start:"Fall 2027", url:"https://www.cam.ac.uk", color:"#a3c1ad" },
  { name:"LMU Munich", country:"Germany", city:"Munich, DE", qs:54, program:"PhD in Linguistics", field:"Linguistics", cat:"Humanities", funding:"Funding available", start:"Spring 2027", url:"https://www.lmu.de", color:"#00883a" },
  { name:"McGill University", country:"Canada", city:"Montreal, CA", qs:29, program:"PhD in Biology", field:"Biology", cat:"STEM", funding:"Funding available", start:"Fall 2027", url:"https://www.mcgill.ca", color:"#ed1b2f" }
];
