// Deep-dive "Learn More" content for each step
// Each entry maps to the corresponding STEPS index

const STEP_DETAILS = [
    // Step 1: Setting Up Google Gemini
    {
        deeper: `Gemini is Google's AI assistant, and it's significantly more powerful than a simple search engine. When you Google something, you get a list of links and have to piece the answer together yourself. With Gemini, you describe what you need in plain English, and it synthesizes information from across the internet into a clear, organized answer tailored to your question.

Think of it like the difference between going to the library and looking things up yourself versus having a brilliant research assistant who reads everything for you and comes back with a summary. For selling your boat, this means instead of spending hours on Boat Trader, YachtWorld, NADA Guides, and boating forums, you can ask Gemini one well-crafted question and get a comprehensive answer in seconds.

The key thing to understand is that Gemini remembers everything within a single conversation. So when you tell it about your boat in your first message, every follow-up question in that conversation already has that context. You don't need to repeat your boat details every time — just like talking to a person who remembers what you said five minutes ago.`,
        impacts: [
            {
                scenario: "Without Gemini",
                detail: "A boat owner in Door County spent 3 weekends researching pricing, reading forums, and calling brokers — roughly 30 hours of work — before he even had a price range for his 38-foot cruiser. He still wasn't confident in his number because every source said something slightly different."
            },
            {
                scenario: "With Gemini",
                detail: "Another seller asked Gemini one detailed question about her 40-foot trawler's value, got a comprehensive analysis with ranges from multiple sources in 2 minutes, then spent 20 minutes asking follow-up questions to refine. Total research time: under 30 minutes, with more confidence than 30 hours of manual research."
            }
        ]
    },
    // Step 2: How to Talk to Gemini
    {
        deeper: `The quality of Gemini's answers is directly proportional to the quality of your questions. This isn't a criticism — it's actually great news, because it means YOU control how helpful Gemini is. The technique is called "prompting," and it's simpler than it sounds.

Think about it like giving instructions to a new employee at one of your hotels. If you said "make the room nice," they'd do an okay job. But if you said "make sure the towels are folded in thirds, the thermostat is set to 72, the curtains are open halfway, and there's a welcome card on the pillow," they'd deliver exactly what you want. Same principle with Gemini.

The three most important things to include in any question are: (1) specific details about YOUR situation, (2) what format you want the answer in, and (3) what you're going to DO with the information. For example, instead of "how much is my boat worth?" try "I need a price range for my boat so I can list it this spring — here are the details..." That context helps Gemini give you actionable answers, not generic ones.`,
        impacts: [
            {
                scenario: "Vague question",
                detail: "\"What's my boat worth?\" — Gemini responds with generic factors that affect boat value. It mentions NADA Guides, condition factors, and market trends in general terms. You learn some things, but nothing specific enough to actually set a price. You still don't know what YOUR boat should sell for."
            },
            {
                scenario: "Specific question",
                detail: "\"I have a 1985 Hatteras 42 LRC with twin Cat 3208 diesels, 3,200 hours, in good condition, docked on Madeline Island, Lake Superior. What price range should I list at?\" — Gemini gives you a specific range based on comparable sales, notes that Great Lakes boats often price differently than coastal ones, and flags that your engine hours are a key negotiation point."
            }
        ]
    },
    // Step 3: Finding Your Boat's Market Value
    {
        deeper: `Boat pricing is more art than science, and that's exactly why it trips so many sellers up. Unlike cars, where you can look up a VIN and get a precise value, boats are priced based on a combination of brand reputation, condition, location, equipment, engine hours, and — critically — how motivated the seller is.

For larger vessels like yours, the market is also much thinner than it is for 20-foot runabouts. There might only be a handful of comparable Hatteras 42 LRCs for sale at any given time, which means each one's asking price heavily influences buyer expectations. This is why researching "comps" (comparable recent sales) is so important — not just current listings, but actual SOLD prices, which are often 10-20% lower than asking prices.

Location matters enormously. A boat on Lake Superior has a different market than the same boat in Fort Lauderdale. The Great Lakes boating season is shorter, the buyer pool is smaller, but there's also less competition from other sellers. Gemini can help you understand these regional dynamics and whether it's worth considering listing your boat in a different market for maximum exposure.`,
        impacts: [
            {
                scenario: "Priced too high",
                detail: "A seller in Bayfield listed his 40-foot trawler at $189,000 based on what he saw on YachtWorld. After 5 months with zero serious offers, he dropped to $159,000. Buyers who had been watching assumed something was wrong with it. He eventually sold for $141,000 — less than he would have gotten by pricing it at $155,000 from the start."
            },
            {
                scenario: "Priced with research",
                detail: "A seller used Gemini to analyze recent sold prices (not just asking prices) for comparable boats in the Great Lakes region. She discovered that similar boats were selling at 85% of asking price. She listed at $165,000 with room to negotiate, sold in 6 weeks at $148,000 — right where the market data predicted."
            }
        ]
    },
    // Step 4: Understanding Pricing Factors
    {
        deeper: `When you ran your hotel chain, you knew that a room's nightly rate wasn't just about the room itself — it was about the location, the season, the amenities, the competition down the street, and even what conventions were in town. Boat pricing works the same way, with dozens of variables that interact with each other.

Engine hours are the "mileage" of the boating world, but they need context. A boat with 3,200 hours on well-maintained Cat diesels tells a very different story than 3,200 hours on gas engines. Diesel engines are built for high hours — many Cat 3208s run reliably past 10,000 hours with proper maintenance. Your maintenance records are worth real money here. Every receipt, every oil analysis, every service log adds buyer confidence and justifies your price.

Upgrades and equipment have wildly different returns on investment. New electronics (chartplotter, radar, fish finder) hold value well because technology changes fast and buyers want current tech. New canvas and enclosures are highly valued because they're expensive to replace. But cosmetic upgrades like custom upholstery or sound systems recover maybe 30-40 cents on the dollar. Ask Gemini which of YOUR specific upgrades actually move the needle for buyers in your price range.`,
        impacts: [
            {
                scenario: "Not understanding engine hours",
                detail: "A seller was embarrassed about his 4,500 engine hours on twin Caterpillar diesels and priced his boat $30,000 below market. A smart buyer snapped it up immediately — because experienced diesel boat buyers know that 4,500 hours on Cats means the engines are barely broken in. The seller left $25,000+ on the table."
            },
            {
                scenario: "Understanding what adds value",
                detail: "A seller spent $12,000 on a new generator and $8,000 on updated Garmin electronics before listing. She asked Gemini which upgrades would actually increase her sale price. Result: the electronics added roughly $6,000 in perceived value, the generator added about $8,000. Total investment: $20,000 for $14,000 in additional value. Knowing this ahead of time, she marketed these upgrades prominently and priced accordingly."
            }
        ]
    },
    // Step 5: Choosing Your Sales Channels
    {
        deeper: `Where you list your boat is just as important as how you price it — because different platforms attract fundamentally different buyers. This is something you'd intuitively understand from the hotel business: you'd market a luxury resort differently than a roadside motel, and you'd advertise in different places.

For a vessel in your class — a large, classic Hatteras with twin diesels — the buyer is likely someone who already knows boats. They're not browsing Facebook Marketplace on a whim. They're searching YachtWorld, talking to brokers, and attending boat shows. But here's the nuance: some of the best deals happen when a listing reaches someone who wasn't actively looking. A well-written Facebook or Craigslist post can reach a local buyer on Madeline Island or in the Apostle Islands area who's been thinking about upgrading — and local buyers save you the hassle of long-distance logistics.

The multi-platform strategy works best for most sellers: list on 1-2 premium platforms (YachtWorld, Boat Trader) for serious national buyers, plus 1-2 local/social platforms (Facebook Marketplace, local marina bulletin boards) for regional buyers. Each platform has different listing fees, audience sizes, and typical buyer profiles. Gemini can break all of this down for your specific boat and location.`,
        impacts: [
            {
                scenario: "Single platform listing",
                detail: "A seller in Duluth listed his 45-foot cruiser only on Craigslist to avoid broker fees. After 4 months, he had plenty of lowball offers and tire-kickers but no serious buyers. The boat's target buyer — someone with $150K+ to spend — wasn't shopping on Craigslist. He lost an entire selling season."
            },
            {
                scenario: "Multi-platform strategy",
                detail: "Another Great Lakes seller listed the same type of boat on YachtWorld (reaching national buyers), Boat Trader (strong search traffic), and Facebook Marketplace (local reach). She got her best offer from a buyer in Chicago who found her on YachtWorld — someone who never would have seen a Craigslist-only listing. The sale happened in 8 weeks."
            }
        ]
    },
    // Step 6: Broker vs. Private Sale
    {
        deeper: `This is the decision that can either save you tens of thousands of dollars or cost you the same amount — depending on your situation. There's no universal right answer, which is why it's worth spending real time with Gemini analyzing YOUR specific circumstances.

A yacht broker typically charges 10% commission. On a $150,000 boat, that's $15,000. That's real money. But here's what you get for it: they handle all showings, qualify buyers (so you're not wasting time with people who can't actually afford it), negotiate on your behalf, manage the sea trial, coordinate the survey, handle the closing paperwork, and manage the marine escrow. They also have networks of buyers and other brokers who might have someone looking for exactly your boat.

The private sale route keeps that $15,000 in your pocket, but you need to be realistic about the work involved. You'll field every call, schedule every showing (which on Madeline Island means coordinating ferry schedules or dock access), deal with lowballers, handle the negotiations personally, and navigate the legal paperwork. For someone in the hotel business, you'd probably handle this well — you're experienced with high-value transactions and customer management. But it does take significant time and energy.

There's also a middle path that many sellers don't know about: you can hire a broker for specific services only. Some brokers will handle just the paperwork and closing for a flat fee of $1,500-3,000, letting you handle marketing and showings yourself.`,
        impacts: [
            {
                scenario: "Choosing a broker wisely",
                detail: "A seller with a $200,000 yacht hired a broker (10% commission = $20,000). The broker brought in a qualified buyer within 6 weeks who paid $192,000. Net to seller: $172,800. But without the broker, he might have sold for $170,000 privately after 4 months of showings. The broker actually earned his commission by getting a higher price, faster."
            },
            {
                scenario: "Successful private sale",
                detail: "A retired business owner in Wisconsin sold his $95,000 cruiser privately. His business background meant he was comfortable negotiating and handling paperwork. He listed on three platforms, did his own showings, and sold in 10 weeks for $88,000 — saving roughly $9,500 in broker commission. His net was higher than it would have been with a broker, but he estimated he spent 40+ hours on the process."
            }
        ]
    },
    // Step 7: Writing a Compelling Listing
    {
        deeper: `Your boat listing is your 24/7 salesperson. It's working while you sleep, while you're at the house, while you're on the ferry. And just like a great hotel website converts browsers into bookers, a great boat listing converts scrollers into callers.

Most boat listings fail because they're either too technical ("Twin Cat 3208 435hp NA diesels, Onan 12.5KW genset, Furuno 1623 radar") or too vague ("Great boat, runs well, must see"). The sweet spot is leading with the EXPERIENCE of owning the boat, then backing it up with the specs. Think about how you'd sell a hotel room — you wouldn't lead with the square footage and mattress brand. You'd paint a picture: "Wake up to panoramic lake views, step onto your private balcony..."

For your Hatteras, the story practically writes itself. It's a classic, well-respected blue-water trawler docked in one of the most beautiful cruising grounds in America. The Apostle Islands, Lake Superior's legendary waters, the community on Madeline Island — that's the dream you're selling. The specs support the dream. Gemini is exceptionally good at taking a list of features and turning them into compelling marketing copy. Give it everything — every upgrade, every maintenance record, every unique feature — and let it craft the narrative.`,
        impacts: [
            {
                scenario: "Generic listing",
                detail: "\"1985 Hatteras 42 LRC for sale. Twin Cat diesels. Sleeps 6. Located in Wisconsin. $XXX,XXX. Call for details.\" — This listing got 3 inquiries in 2 months. Buyers scrolled right past it because there was nothing to grab their attention or differentiate it from dozens of other listings."
            },
            {
                scenario: "Compelling listing",
                detail: "\"Cruise the Apostle Islands in timeless Hatteras style. This 42' Long Range Cruiser has called Lake Superior home for [X] seasons, powered by bulletproof twin Cat 3208 diesels with full service records. Sleeps 6 comfortably for extended island-hopping adventures...\" — A similar listing, rewritten with Gemini, generated 15+ inquiries in the first month because it told a story that helped buyers picture themselves aboard."
            }
        ]
    },
    // Step 8: Photo & Presentation Tips
    {
        deeper: `In the hotel business, you know that professional photography is non-negotiable — no one books a room based on a dark, blurry cell phone photo. The same principle applies to selling your boat, but many boat sellers completely neglect this. Studies of online boat marketplaces show that listings with high-quality photos receive 3-5 times more inquiries AND sell faster, often at higher prices.

You don't need to hire a professional photographer (though for a boat in your price range, the $300-500 investment often pays for itself). What you need is good light, a clean boat, and a systematic approach. Lake Superior gives you a huge advantage here — the light on the water, the Apostle Islands in the background, the natural beauty of Madeline Island all make for stunning photos that help your listing stand out from boats photographed in bland marinas.

The most common photography mistakes are: shooting at noon (harsh shadows, washed out colors), not cleaning the boat first (buyers notice water stains, cluttered decks, and dirty upholstery in photos), not including enough interior shots (the cabin and sleeping quarters are where buyers mentally picture themselves living), and forgetting the engine room (a clean, organized engine compartment signals a well-maintained boat better than words ever could).`,
        impacts: [
            {
                scenario: "Poor photos",
                detail: "A seller snapped 6 quick phone photos of his boat at the dock on an overcast afternoon. The interior was dim, the cockpit had fishing gear everywhere, and two of the photos were slightly blurry. His listing sat for 3 months with minimal interest. When he finally hired a friend to help re-shoot on a sunny morning after a deep clean, inquiries tripled within two weeks — same boat, same price, just better photos."
            },
            {
                scenario: "Strategic photography",
                detail: "A seller on Lake Michigan used Gemini's shot list to plan a golden-hour photo session. She cleaned the boat stem to stern, staged the salon with fresh flowers and neat cushions, opened all hatches for natural light, and shot 40+ photos including specific detail shots of new electronics and a spotless engine room. Her listing stood out so much that two buyers flew in from out of state within the first month."
            }
        ]
    },
    // Step 9: Required Documents & Transfers
    {
        deeper: `Paperwork isn't glamorous, but it's where boat sales either close smoothly or fall apart entirely. And depending on your state and whether your boat is Coast Guard documented, the requirements can vary significantly. This is one area where Gemini is incredibly valuable because it can pull together state-specific requirements that would otherwise take you hours of research across multiple government websites.

In Wisconsin (and Minnesota, since you're in the border region), boat title transfer requirements include the original title signed by the seller, a notarized bill of sale, and registration paperwork. If your boat is Coast Guard documented — which is common for vessels over 26 feet, especially offshore-capable boats like a Hatteras — there's a separate federal process through the National Vessel Documentation Center. This can take 4-8 weeks, so you need to start early.

Beyond the title, there are several documents that aren't legally required but are extremely valuable for closing a sale: complete maintenance records, engine survey history, oil analysis reports, insurance claims history, and any warranties that transfer. Think of it like selling a hotel — the buyer wants to see the books before they buy. A thick folder of maintenance records tells the buyer "this owner cared about this boat," and that confidence translates directly into willingness to pay your asking price.`,
        impacts: [
            {
                scenario: "Missing paperwork",
                detail: "A seller in Bayfield had a buyer ready to close at full asking price. But his Coast Guard documentation had an old lien from a previous owner that was never cleared. The documentation issue took 10 weeks to resolve — and the buyer walked away after week 6. The seller eventually sold to a different buyer for $18,000 less. Starting the paperwork process early would have caught this before it killed the deal."
            },
            {
                scenario: "Paperwork-ready seller",
                detail: "A seller had her complete documentation package ready before she even listed: clear title, current registration, Coast Guard docs, 10 years of maintenance records in a binder, three years of oil analysis, and a recent survey. When a serious buyer appeared, the sale closed in 3 weeks — the buyer later said the organized documentation was the single biggest factor in his confidence to pay full price."
            }
        ]
    },
    // Step 10: Protecting Yourself in the Sale
    {
        deeper: `After decades in the hotel business, you know that contracts and liability protection aren't about being paranoid — they're about being professional. The same applies to selling a boat, especially a high-value vessel. The stakes are too high for a handshake deal, and unfortunately, boat transactions attract their share of scammers and dishonest actors.

The most common scams target sellers specifically: fake cashier's checks (they look real but bounce after you've already handed over the boat), "overpayment" scams (buyer sends a check for more than the price and asks you to wire the difference), and deposit fraud (someone sends a small deposit to "hold" the boat with a stolen credit card, then asks you to take it off the market). These scams are sophisticated enough to fool experienced business people. The golden rule: never release the boat until the funds have fully cleared, and "cleared" means the bank has confirmed the funds — not just that the check has been deposited.

For a boat in your price range, using a marine escrow service is strongly recommended. It works like real estate escrow: the buyer deposits funds with a neutral third party, the survey and sea trial happen, and only when both parties are satisfied does the escrow release the funds to you and the documentation to the buyer. The cost is typically 1-2% of the sale price, and it protects both you and the buyer. Given your location on Madeline Island, coordinating the physical handoff logistics is also important — you'll want to clearly define where and when the transfer happens, who pays for the haul-out if needed, and what happens if the buyer needs to arrange transport.`,
        impacts: [
            {
                scenario: "No protection",
                detail: "A private seller accepted a cashier's check for $78,000, signed over the title, and let the buyer take the boat. Three days later, his bank informed him the check was counterfeit. The boat was already two states away. He recovered nothing — total loss of the boat AND the title had been transferred. Marine escrow would have prevented this entirely because the funds would have been verified before any documents changed hands."
            },
            {
                scenario: "Protected transaction",
                detail: "A seller used a marine escrow service ($1,200 cost on a $130,000 sale). The buyer deposited funds into escrow, then hired a marine surveyor for an independent inspection. The survey revealed a minor issue with the exhaust system — the seller agreed to a $3,000 price reduction. Both parties signed off, escrow released funds to the seller and documentation to the buyer. Clean, professional, and both sides felt protected throughout."
            }
        ]
    }
];

export default STEP_DETAILS;
