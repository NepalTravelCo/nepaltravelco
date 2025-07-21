import React from 'react'
import './styles/ExploreValley.css';

const sections = [
 
  {
    title: "Kathmandu Durbar Square",
    image: "https://i.pinimg.com/1200x/3a/e6/11/3ae61135291ed9e10306ae0c56e8333d.jpg",
    content: `Located at the heart of the old city, Kathmandu Durbar Square is a lively area filled with palaces, courtyards, and temples that once housed the Malla kings. Don’t miss the Kumari Ghar, where the Living Goddess of Nepal resides. From intricately carved wooden windows to towering pagodas, every corner tells a story of the city's glorious past.`,
  },
  {
    title: "Patan Durbar Square",
    image: "https://i.pinimg.com/736x/44/a2/80/44a28061008c72849c8dae6b42815a1b.jpg",
    content: `Just across the Bagmati River lies Patan (Lalitpur), home to a square that feels like a work of art. Patan Durbar Square is known for its red-brick temples, stone baths, and the Patan Museum, which displays centuries-old sculptures and sacred objects. This area is especially appealing to lovers of fine art, architecture, and peaceful courtyards.`,
  },
  {
    title: "Bhaktapur Durbar Square",
    image: "https://i.pinimg.com/736x/55/13/68/551368b3616f86d61d8348f83be1b6c9.jpg",
    content: `Stepping into Bhaktapur is like walking into a time capsule. The city is well-preserved and known for its traditional way of life. Bhaktapur Durbar Square features the iconic 55-Window Palace, the Golden Gate, and beautiful stone temples. Just a short walk away is Pottery Square, where you can see artisans shaping clay by hand, an age-old tradition still alive today.`,
  },
  
];
function DurbarSquares() {
  return (
    <>
    <div className="explore-valley-body">
    <div className="explore-valley">
      <h2 id='explore-valley-title'>The Historic Durbar Squares</h2>
      <p id='explore-valley-desc'>The three ancient cities of the Kathmandu Valley, Kathmandu, Patan, and Bhaktapur each boast their own Durbar Square, or Royal Palace Square. These stunning complexes are UNESCO World Heritage Sites and showcase the finest examples of Newari architecture, artistry, and royal history.</p>
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

export default DurbarSquares