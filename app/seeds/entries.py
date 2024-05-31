from app.models import db, Entry, environment, SCHEMA
from sqlalchemy.sql import text


def seed_entries():
    one  = Entry(
        user_id = 1,
        notebook_id = 1,
        name = 'the Closet',
        content='''Every night, Lisa heard the same soft whispering coming from her closet. "I'm watching you," it would murmur. Terrified, she would hide under her blanket, too scared to move. One night, fed up with the sleepless nights, she bravely got out of bed and yanked the closet door open.

                Inside, there was nothing but her clothes and shoes. Relieved, she laughed at her imagination and turned to go back to bed. As she did, she caught a glimpse of her mirror. In its reflection, her closet door was still open—and a pair of glowing eyes stared back at her from the darkness.'''
        )
    two  = Entry(
        user_id = 1,
        notebook_id = 2,
        name = 'May 2, 2024',
        content='''Today was my third day at the new job, and I think I'm finally starting to get the hang of things. The office is really modern and open, which I love. There's a cozy little break room with a coffee machine that makes the best cappuccinos. I might become addicted.

                    My team is super friendly. Sarah, my mentor, has been incredibly patient with me. She walked me through the project management software again this morning. It's still a bit overwhelming, but I'm getting more comfortable with it. By lunchtime, I was able to create a task board all by myself!

                    I had lunch with a few colleagues in the park across the street. The weather was perfect—sunny with a light breeze. We talked about everything from weekend plans to the best places to get sushi in the area. I think I'm really going to like hanging out with them.

                    In the afternoon, I sat in on a meeting about the new marketing campaign we're launching next month. It was fascinating to see how ideas evolve from brainstorming to actual strategy. I even pitched an idea about using more interactive content on our social media platforms, and surprisingly, everyone seemed to like it! They even asked me to develop it further for our next meeting.

                    After work, I decided to explore the neighborhood a bit. There's this cute little bookstore a few blocks away. I couldn't resist picking up a novel I've been wanting to read. On my way home, I felt a sense of contentment. Starting a new job is always nerve-wracking, but today made me feel like I'm exactly where I need to be.

                    Here's to more good days ahead.

                    Demo User'''
        )
    three  = Entry(
        user_id = 1,
        notebook_id = 1,
        name = "The Mysterious Hole",
        content='''In the quiet town of Oak Hollow, nestled between rolling hills and dense forests, there was an ordinary park with an extraordinary secret. For years, children played on the swings, families picnicked on the grass, and couples strolled hand-in-hand under the ancient oaks. But no one paid much attention to the old, forgotten well at the park's edge, until one fateful day.

                   Jenny, an adventurous eight-year-old with a wild imagination, had always been drawn to the well. It was covered with a rusted iron grate, and most people ignored it, assuming it was just a relic from the past. But Jenny saw it as a portal to another world, a place where anything could happen.

                   One sunny afternoon, while her parents chatted with friends nearby, Jenny approached the well. She peered through the gaps in the grate and saw nothing but darkness. Curiosity getting the better of her, she carefully removed the grate, which was surprisingly light despite its appearance. She leaned over the edge and called out, "Hello?"

                   To her amazement, a soft, echoing voice replied, "Hello."

                   Jenny gasped and stepped back. She wasn't sure if she had imagined it. Taking a deep breath, she called again, "Who are you?"

                   The voice answered, "I'm trapped down here. Can you help me?"

                   Jenny's heart pounded. She ran back to her parents, tugging on her mother's sleeve. "Mom, there's someone in the well!"

                   Her mother laughed, dismissing it as another one of Jenny's imaginative tales. "Sweetie, there's no one in the well. It's been abandoned for years."

                   Frustrated but undeterred, Jenny grabbed a flashlight from their picnic basket and returned to the well. Shining the light down, she saw something glinting far below. It was a small, silver key.

                   "Hold on! I'll get help," Jenny called out, more determined than ever. She ran to the park ranger's office and convinced Ranger Tom to come with her. Skeptical but kind-hearted, Tom followed Jenny to the well.

                   Using a rope, Ranger Tom carefully lowered himself into the well. As he descended, Jenny watched anxiously. Minutes felt like hours until finally, Tom called out, "I've found something!"

                   When he emerged, he held a small, intricately carved wooden box, the kind that might hold a treasure or a secret. He handed it to Jenny, who turned the silver key in the lock. The box creaked open, revealing an old, dusty journal.

                   Together, Jenny and Tom read the journal's first entry:

                   "May 3, 1886. If you have found this, know that the well is a gateway to the past. I am Henry, a traveler from another time, trapped in this present day. The key to freeing me lies within these pages. Please, help me return home."

                   Jenny's eyes widened. "We have to help him!"

                   Ranger Tom nodded, equally intrigued. "Let's see what we can do."

                   The journal contained detailed instructions for a ritual to open the gateway. Jenny and Tom gathered the necessary items—a feather, a candle, and a handful of oak leaves. That evening, as the sun set and the park emptied, they performed the ritual by the well.

                   The air shimmered, and a swirling vortex of light emerged from the well. From its depths, a figure stepped out—an old man dressed in Victorian clothes, looking bewildered but relieved.

                   "Thank you," Henry said, his voice the same soft echo Jenny had heard. "You've given me a chance to return to my time."

                   With a final smile, he stepped back into the vortex, and it closed behind him. The well returned to its ordinary appearance, but Jenny knew it held extraordinary secrets.

                   From that day on, she never stopped believing in the magic hidden in everyday places, and the well became a cherished part of Oak Hollow's lore—a testament to the power of curiosity and courage.'''
        )
    four  = Entry(
        user_id = 1,
        notebook_id = 1,
        name = 'Castaway',
        content='''The waves crashed against the battered hull of the small fishing boat as it drifted aimlessly in the vast expanse of the ocean. Captain James had been adrift for days, his provisions dwindling and hope fading with each passing hour. He was a castaway, stranded in the middle of nowhere with no sign of rescue on the horizon.

                 As he lay on the deck, staring up at the endless sky, memories of home flooded his mind. He thought of his wife, Sarah, and their two young children waiting for him back in the coastal town he called home. Tears welled in his eyes as he imagined never seeing them again.

                 But just as despair threatened to consume him, Captain James spotted something on the distant horizon—a speck of land barely visible against the vast blue expanse. With renewed hope, he mustered all his strength and hoisted the sails, steering the boat toward the distant shore.

                 Hours passed, the sun beating down relentlessly as Captain James fought against the currents and the wind. Finally, as the sun dipped below the horizon, he felt the gentle lapping of waves against the boat's hull. He had reached land—a small, uninhabited island surrounded by lush greenery and pristine beaches.

                 With trembling legs, Captain James stepped onto the sandy shore, his heart pounding with a mix of relief and uncertainty. He knew that survival would not be easy, but he was determined to make the most of his newfound refuge.

                 Days turned into weeks as Captain James settled into a routine of fishing, foraging for food, and collecting rainwater for drinking. He built a makeshift shelter from palm fronds and driftwood, finding solace in the simplicity of his new life.

                 But as the weeks stretched into months, Captain James began to feel the weight of loneliness pressing down on him. He longed for human contact, for the sound of laughter and the warmth of a friendly embrace. He missed his family more than words could express.

                 One day, while exploring the island's rocky cliffs, Captain James made a startling discovery—a small cave hidden among the jagged rocks, its entrance obscured by dense foliage. Intrigued, he ventured inside, his heart racing with anticipation.

                 To his amazement, the cave was not empty. Nestled in the darkness were several wooden crates, their contents revealed by the flickering light of his torch. Inside, Captain James found supplies—canned food, fresh water, and even a radio transmitter.

                 Overwhelmed with gratitude, Captain James realized that he was not alone after all. Someone had been here before him, someone who had left behind these provisions as a lifeline for whoever might come next.

                 With renewed determination, Captain James set to work repairing the radio transmitter, hoping against hope that his distress signal would reach someone, anyone, who could rescue him from his lonely exile.

                 And as he waited for a response, he vowed to never forget the kindness of the stranger who had saved his life—a beacon of hope in his darkest hour of need.'''
        )
    five  = Entry(
        user_id = 1,
        notebook_id = 1,
        name = 'The Dance of Seasons',
        content='''In the heart of a lush forest stood a majestic oak tree, its branches reaching toward the sky like outstretched arms. For generations, the oak had stood as a silent witness to the ever-changing dance of the seasons.

                As winter's icy grip loosened its hold on the land, the oak tree stirred from its slumber. Tiny buds appeared on its gnarled branches, promising new life after the long, cold months. The forest awakened with the sound of chirping birds and scampering woodland creatures, eager to greet the arrival of spring.

                With each passing day, the forest transformed before the oak's ancient eyes. Delicate flowers bloomed in a riot of color, carpeting the forest floor in shades of pink, purple, and yellow. The air was alive with the sweet scent of blossoms, carried on the gentle breeze.

                As spring gave way to summer, the forest hummed with activity. The oak tree's canopy provided shade for weary travelers seeking respite from the scorching sun. Children laughed and played among the dappled sunlight, their voices echoing through the leafy boughs.

                But summer's warmth was fleeting, and soon the days grew shorter, and the nights grew cooler. The leaves on the oak tree began to change, turning brilliant shades of crimson, gold, and orange. A sense of anticipation filled the air as the forest prepared for the arrival of autumn.

                With a sigh, the oak tree released its leaves, letting them drift to the forest floor like golden rain. The ground was carpeted with a patchwork of colors, a testament to the beauty of nature's cycle. The air was crisp and invigorating, carrying with it the promise of change.

                And change did come, as it always did. The days grew colder, and a frosty chill settled over the land. The oak tree stood tall and proud, its branches bare against the slate-gray sky. Snow began to fall, soft and silent, blanketing the forest in a pristine layer of white.

                As winter tightened its grip once more, the forest fell silent, wrapped in a blanket of stillness. The oak tree stood alone in its quiet majesty, a symbol of strength and resilience in the face of nature's ever-changing whims.

                And so the dance of seasons continued, each one blending seamlessly into the next, a timeless cycle of growth, decay, and rebirth. And through it all, the oak tree stood as a silent sentinel, bearing witness to the beauty and wonder of the natural world.'''
        )
    six  = Entry(
        user_id = 1,
        notebook_id = 2,
        name = 'May 17, 2024',
        content='''Today was pretty uneventful, but sometimes that's exactly what I need. Woke up at 7, hit the gym, and did a solid hour of cardio. Felt good to get my heart pumping. Came home, showered, and had my usual smoothie bowl for breakfast. I've been experimenting with adding different fruits—today was dragon fruit, and it was delicious!

                Work was the usual mix of emails and meetings. I’m still getting the hang of my new project, but I feel like I’m making progress. Had a nice chat with Emma over lunch; we grabbed salads from that new place downtown. We talked about her upcoming trip to Spain—I'm so jealous!

                After work, I stopped by the bookstore and picked up the latest novel by my favorite author. Can’t wait to dive into it tonight. Made a simple dinner of pasta and veggies, and then just relaxed with a few episodes of that new series everyone’s been raving about.

                Now, I'm in bed, journaling and reflecting on the day. Nothing extraordinary happened, but sometimes these quiet, routine days are the best. They make me appreciate the small things. Tomorrow, I’ll tackle whatever comes my way, but for now, I’m grateful for today’s calm.

                Goodnight, journal. Here’s to more peaceful days.'''
        )
    seven  = Entry(
        user_id = 1,
        notebook_id = 3,
        name = "Chapter 1: The Rise of Captain Simian",
        content='''In the year 2147, humanity's quest to conquer the stars had reached unprecedented heights. Earth had established numerous colonies across the galaxy, and the United Interstellar Fleet was at the forefront of this expansion. Among its ranks was an unlikely hero, a being whose intelligence had been artificially enhanced to surpass that of the average human—a monkey named Simian.

                Simian had been part of a groundbreaking experiment conducted by the renowned scientist Dr. Evelyn Carter. Her project aimed to bridge the gap between humans and other species, enhancing their cognitive abilities to explore new possibilities. Simian, a chimpanzee from the Congo, had shown remarkable promise from the start. His quick learning, problem-solving skills, and leadership qualities set him apart from his peers.

                On the day of his promotion, the fleet's command center buzzed with excitement. Officers and scientists alike gathered to witness the historic moment. Simian stood at attention, wearing a custom-tailored uniform adorned with the insignia of the United Interstellar Fleet. His fur was impeccably groomed, and his expressive eyes conveyed a mix of pride and determination.

                Admiral Jackson, a stern yet respected leader, stepped forward to address the assembly. "Today marks a monumental occasion in the history of our fleet," he began. "We are here to recognize the achievements of a remarkable individual. His journey from a research subject to a starship captain exemplifies the potential of interspecies cooperation and the boundless possibilities of our future. It is my honor to introduce Captain Simian."

                The room erupted in applause as Simian stepped forward. He saluted the admiral and took his place at the podium. "Thank you, Admiral Jackson," Simian began, his voice clear and confident. "I am deeply honored to accept this responsibility. Together, we will explore the unknown, seek out new life, and protect our colonies across the galaxy."

                As the ceremony concluded, Simian's new crew assembled in the briefing room of the starship Galileo. The vessel was a marvel of modern engineering, equipped with advanced propulsion systems, cutting-edge weaponry, and state-of-the-art research labs. The crew consisted of a diverse group of humans and other enhanced species, all chosen for their expertise and dedication.

                First Officer Maria Torres, a seasoned pilot with a no-nonsense attitude, approached Simian. "Welcome aboard, Captain," she said, extending her hand. "We're ready for our first mission."

                Simian shook her hand, grateful for her support. "Thank you, First Officer Torres. What's our assignment?"

                "We've received a distress signal from the mining colony on Epsilon Prime," Torres explained. "They're experiencing unusual seismic activity, and their communications have been disrupted. Our mission is to investigate and provide assistance."

                "Understood," Simian replied, his mind already racing with possibilities. "Prepare the crew for departure. We leave in one hour."

                The Galileo's engines roared to life as the ship lifted off from the spaceport. Simian stood on the bridge, gazing out at the vast expanse of stars. This was the moment he had been preparing for, the culmination of years of training and dedication. He felt a profound sense of responsibility for his crew and the mission ahead.

                As the ship hurtled through space at faster-than-light speeds, Simian reviewed the data on Epsilon Prime. The colony was located on a remote planet rich in valuable minerals. However, its position on a tectonic fault line made it vulnerable to seismic disturbances. The recent increase in activity was concerning, and Simian knew they had to act quickly.

                "Captain, we're approaching Epsilon Prime," Torres reported from her station.

                "Thank you, First Officer," Simian replied. "Begin scanning the planet's surface for any anomalies. Let's see if we can pinpoint the source of the seismic activity."

                The Galileo's sensors swept over the planet, collecting data and transmitting it to the bridge. As the information appeared on the screen, Simian's sharp eyes analyzed the readings. He noticed an unusual energy signature emanating from deep beneath the colony's main settlement.

                "There's something down there," Simian said, pointing to the display. "An energy source of unknown origin. It could be causing the tremors."

                "Should we send a team to investigate?" Torres asked.

                "Yes," Simian replied. "Prepare an away team and have them equipped for subterranean exploration. I'll lead the mission myself."

                "Understood, Captain," Torres said, giving the necessary orders.

                Simian felt a surge of excitement as he prepared for the mission. This was what he had trained for—leading his crew into the unknown, solving mysteries, and ensuring the safety of those in need. As the shuttle descended toward the planet's surface, he couldn't help but feel a sense of adventure and purpose.

                The shuttle touched down near the colony, and the away team disembarked. Simian led the way, his keen senses attuned to the environment. The colony was eerily quiet, the usual bustle of activity replaced by an uneasy stillness. The colonists had taken refuge in emergency shelters, leaving the surface deserted.

                "Let's move," Simian said, guiding the team toward the source of the energy signature.

                They traversed rocky terrain and descended into a network of underground tunnels. The further they went, the stronger the energy readings became. The air grew warmer, and the ground trembled beneath their feet. Simian could sense they were getting closer.

                Finally, they reached a massive cavern, illuminated by a pulsing, bluish light. In the center of the cavern stood a towering crystalline structure, radiating energy. Simian approached it cautiously, his curiosity tempered by caution.

                "This must be it," he said, marveling at the sight. "But what is it?"

                Before he could ponder further, the ground shook violently, and the cavern walls began to crack. Simian realized they had little time. "We need to stabilize this structure or find a way to shut it down," he ordered. "Suggestions?"

                One of the scientists, Dr. Malik, stepped forward. "If we can recalibrate the energy output, we might be able to reduce the seismic activity. I'll need to interface with the structure's energy matrix."

                "Do it," Simian said. "We'll cover you."

                As Dr. Malik worked, Simian and the rest of the team kept a vigilant watch. The tremors grew more intense, and debris started to fall from the cavern ceiling. It was a race against time, but Simian's resolve never wavered. He knew they had to succeed.

                After what felt like an eternity, Dr. Malik shouted, "I've done it! The energy output is stabilizing."

                The tremors began to subside, and the cavern grew still. Simian let out a sigh of relief. "Good work, everyone. Let's head back to the shuttle."

                As they made their way back to the surface, Simian couldn't help but feel a sense of accomplishment. Their first mission had been a success, and they had protected the colony from disaster. He knew there would be many more challenges ahead, but with his crew by his side, he was ready to face whatever the universe had in store.

                Back on the Galileo, Simian stood on the bridge, looking out at the stars once more. He felt a deep sense of pride in his team and the journey they had begun together. As Captain Simian, he was determined to lead them with courage, wisdom, and a spirit of exploration.

                The odyssey had just begun, and he couldn't wait to see where it would take them.'''
        )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)
    db.session.add(seven)
    db.session.commit()

def undo_entries():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.entries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM entries"))

    db.session.commit()
