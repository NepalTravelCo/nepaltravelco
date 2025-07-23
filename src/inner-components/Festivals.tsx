"use client"
import './styles/ExploreValley.css';

const sections = [
  
  {
    title: "Indra Jatra",
    image: "https://i.pinimg.com/1200x/e2/48/4a/e2484a6ffff165497573d186887f3fba.jpg",
    content: `Celebrated in Kathmandu, Indra Jatra is an eight-day festival that honors Indra, the god of rain and heaven. The highlight is the chariot procession of the Living Goddess Kumari, who is paraded through the city streets. Masked dances, traditional music, and the raising of a tall ceremonial pole (Lingo) at Hanuman Dhoka make it a spectacular event. It usually takes place in September.`,
  },
  {
    title: "Bisket Jatra",
    image: "https://i.pinimg.com/736x/bc/67/c7/bc67c743b1f012078159b0ceee13babf.jpg",
    content: `This wild and vibrant festival is held in Bhaktapur during the Nepali New Year (April). It features thrilling chariot tug-of-wars, symbolic rituals, and local music that bring the town to life. The pulling of massive wooden chariots through narrow alleys turns into a friendly but fierce contest among locals. It's a unique experience you won’t see anywhere else.`,
  },
  {
    title: "Rato Machhendranath Jatra",
    image: "https://i.pinimg.com/736x/49/4c/9e/494c9ef253905576cf0b43cc7fab38af.jpg",
    content: `One of the longest and oldest festivals in the valley, this chariot festival is held in Patan in honor of Rato Machhendranath, the god of rain and harvest. A towering wooden chariot is pulled through the city over several weeks. It brings together people of all backgrounds in a shared prayer for good rainfall and prosperity.`,
  },
  
];

function Festivals() {
  return (
    <>
    <div className="explore-valley-body">
    <div className="explore-valley">
      <h2 id='explore-valley-title'>Festivals & Celebrations</h2>
      <p id='explore-valley-desc'>Kathmandu Valley is alive with festivals all year round, each one bursting with color, energy, and centuries of tradition. These celebrations blend Hindu and Buddhist beliefs with unique local customs, turning the streets into lively stages of dance, music, and devotion. Here are some of the valley&apos;s most iconic festivals:</p>
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

export default Festivals