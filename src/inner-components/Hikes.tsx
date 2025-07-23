"use client"
import './styles/ExploreValley.css';


const sections = [
  
  {
    title: "Nagarjun Hill (Jamacho)",
    image: "https://i.pinimg.com/1200x/51/f8/81/51f881d9c2ac251438e975a3c4861ee5.jpg",
    content: `Just a short drive from central Kathmandu, Nagarjun Hill is part of the Shivapuri-Nagarjun National Park. The hike takes around 3–4 hours uphill through a peaceful forest filled with birds and prayer flags. At the top, you’ll find a small monastery and a panoramic view of the valley and surrounding hills.`,
  },
  {
    title: "Champadevi Hike",
    image: "https://i.pinimg.com/1200x/06/04/d4/0604d48fa06c119f4212d33daf195563.jpg",
    content: `This moderate hike takes you to one of the southern ridges of the valley. Starting from Pharping or Taudaha Lake, the trail passes through pine forests and traditional villages. At the top, you’ll find a stupa and stunning views of Kathmandu, with a glimpse of the Himalayas on a clear day. It’s peaceful, green, and a great way to experience rural Nepal.`,
  },
  {
    title: "Namobuddha",
    image: "https://i.pinimg.com/1200x/b7/5a/d4/b75ad43575f0b71fd5943766facfa450.jpg",
    content: `Located a bit further out (about 2 hours by drive), Namobuddha is a sacred Buddhist site known for its large monastery and serene atmosphere. You can do a gentle hike from nearby Panauti or Dhulikhel through terraced fields and small villages. It’s ideal for those seeking a blend of spiritual calm, local culture, and natural beauty.`,
  },
];

function Hikes() {
  return (
    <>
    <div className="explore-valley-body">
    <div className="explore-valley">
      <h2 id='explore-valley-title'>Short Hikes & Adventures</h2>
      <p id='explore-valley-desc'>If you&apos;re looking to stretch your legs and escape the city without going too far, Kathmandu Valley offers some great day hikes with fresh air, forest trails, and scenic viewpoints. These adventures are perfect for travelers who want a taste of nature and local life.</p>
      {sections.map((section, index) => (
        <div
          key={index}
          className={`valley-section ${index % 2 === 0 ? 'row-normal' : 'row-reverse'}`}
        >
          <div className="valley-image">
            <img src={section.image} alt={section.title} />
          </div>
          <div className="valley-text">
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </div>
        </div>
      ))}
    </div>
</div>
    </>
  )
}

export default Hikes