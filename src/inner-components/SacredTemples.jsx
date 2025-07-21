import React from 'react'
import './styles/ExploreValley.css'
const sections = [
  {
    title: "Swayambhunath (Monkey Temple)",
    image: "https://i.pinimg.com/1200x/fd/f0/9d/fdf09d787c84b6d7783b711dc63c56c9.jpg",
    content: `Situated on a hilltop overlooking Kathmandu, Swayambhunath is one of the oldest and most iconic religious sites in Nepal. To reach the stupa, you climb a steep staircase and once at the top, you’ll be greeted with panoramic views of the city and a peaceful spiritual aura. The stupa, which is crested with Buddha's watching eyes, is known as the "Monkey Temple" because it is surrounded by smaller temples and amusing monkeys. Both Hindus and Buddhists consider it sacred.`,
  },
  {
    title: "Boudhanath Stupa",
    image: "https://i.pinimg.com/1200x/67/36/15/673615da882896e76b7949f693d2b154.jpg",
    content: `Boudhanath is one of the largest stupas in the world and a major center of Tibetan Buddhism. Its giant white dome and golden spire draw pilgrims and tourists alike. Walking clockwise around the stupa (a practice called "kora"), spinning the prayer wheels, and lighting butter lamps offer a peaceful retreat from the city buzz. The surrounding area is filled with monasteries, Tibetan shops, and cozy cafes offering momo and butter tea.`,
  },
  {
    title: "Pashupatinath Temple",
    image: "https://i.pinimg.com/736x/74/49/8d/74498d4277e8f60dbef2ebf76d32de6f.jpg",
    content: `One of the holiest Hindu temples in the world, Pashupatinath is dedicated to Lord Shiva and lies on the banks of the sacred Bagmati River. While non-Hindus cannot enter the main temple, they can still witness the temple’s spiritual power by observing evening Aarti rituals and open-air cremation ceremonies from across the river. The temple complex is full of ancient sculptures, sadhus (Hindu ascetics), and stories that reflect Nepal’s deep devotion and traditions.`,
  },
  
];

function SacredTemples() {
  return (
    <>
    
    <div className="explore-valley-body">
    <div className="explore-valley">
      <h2 id='explore-valley-title'>Sacred Temples of the Valley</h2>
      <p id='explore-valley-desc'>Kathmandu Valley is a place where spirituality meets history. Its sacred temples are not just places of worship, rather they are windows into Nepal’s deep-rooted culture, timeless architecture, and living traditions. Whether you’re a spiritual seeker or a curious traveler, visiting these sites is a soul refreshing experience.</p>
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

export default SacredTemples