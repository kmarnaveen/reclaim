import type { MaterialCategory } from "./materials";

export type Market = "india" | "europe" | "middle-east";
export type MaterialSlug = MaterialCategory["slug"];

/**
 * Industrial areas we trade into and out of.
 *
 * Each entry carries area-specific trade facts — the streams that area
 * actually generates or consumes, the grades that move there and the
 * logistics node it clears through. This is deliberate: a set of location
 * pages that differ only by place name is a doorway-page pattern and is
 * penalised. Every field here has to say something true of this area and
 * not of its neighbours, or the area does not belong in the list.
 */
export type IndustrialArea = {
  slug: string;
  name: string;
  /** State, province or emirate. */
  region: string;
  country: string;
  market: Market;
  /** Does the area generate scrap, consume it, or both? Drives the page copy. */
  role: "source" | "demand" | "both";
  materials: MaterialSlug[];
  /** One authored sentence on what makes this area a trade counterparty. */
  character: string;
  /** Grades that actually move in or out of this area. */
  grades: string[];
  /** Port, ICD or corridor the area clears through. */
  logistics: string;
};

export const industrialAreas: IndustrialArea[] = [
  // ---------------------------------------------------------------- India
  {
    slug: "mandi-gobindgarh",
    name: "Mandi Gobindgarh",
    region: "Punjab",
    country: "India",
    market: "india",
    role: "demand",
    materials: ["metal"],
    character:
      "India's largest re-rolling and induction furnace cluster, known as the country's steel town. Hundreds of furnaces here run almost entirely on purchased ferrous scrap, making it a demand centre rather than a generator.",
    grades: ["HMS 1 & 2", "Shredded steel", "Busheling", "Rebar cuttings", "Turnings and borings"],
    logistics: "Road from Ludhiana; ICD Ludhiana for import containers",
  },
  {
    slug: "ludhiana",
    name: "Ludhiana",
    region: "Punjab",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal", "textile"],
    character:
      "Bicycle parts, fasteners, auto components and hosiery in one city. The engineering side generates heavy steel and non-ferrous offcuts; the knitwear side generates cotton and blended textile waste at volume.",
    grades: ["Steel sheet cuttings", "Brass and copper offcuts", "Hosiery clips", "Cotton yarn waste"],
    logistics: "ICD Ludhiana; road to Ludhiana–Mundra corridor",
  },
  {
    slug: "jalandhar",
    name: "Jalandhar",
    region: "Punjab",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "Hand tools, sports goods and castings. Foundries here consume cast and steel scrap while machining shops generate a steady turnings and borings stream.",
    grades: ["Cast iron scrap", "Steel turnings", "Sheet cuttings"],
    logistics: "ICD Ludhiana; road to Delhi NCR",
  },
  {
    slug: "mayapuri-delhi",
    name: "Mayapuri",
    region: "Delhi",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "Delhi's oldest and largest scrap market, built around dismantling and metal trading rather than manufacturing. Material is graded, cut and re-traded here rather than consumed.",
    grades: ["Mixed ferrous", "Non-ferrous mixed", "Motor scrap", "Aluminium sections"],
    logistics: "Road to Ghaziabad and Loni processors; ICD Tughlakabad",
  },
  {
    slug: "wazirpur-delhi",
    name: "Wazirpur",
    region: "Delhi",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "Steel rolling and pickling lines concentrated in one industrial area, working stainless and mild steel flats. Generates end cuttings and consumes purchased flat scrap.",
    grades: ["Stainless steel 304/316 scrap", "MS flat cuttings", "Pickled coil ends"],
    logistics: "Road within NCR; ICD Tughlakabad",
  },
  {
    slug: "loni-ghaziabad",
    name: "Loni, Ghaziabad",
    region: "Uttar Pradesh",
    country: "India",
    market: "india",
    role: "demand",
    materials: ["metal", "rubber"],
    character:
      "A dense processing belt on Delhi's eastern edge handling metal recovery and rubber reclaim. Absorbs material collected across NCR for sorting and onward supply.",
    grades: ["Mixed ferrous", "Copper wire scrap", "Tyre scrap", "Reclaim rubber feed"],
    logistics: "Road to NCR; ICD Dadri",
  },
  {
    slug: "muzaffarnagar",
    name: "Muzaffarnagar",
    region: "Uttar Pradesh",
    country: "India",
    market: "india",
    role: "demand",
    materials: ["paper"],
    character:
      "The largest recycled paper mill cluster in India, running kraft and duplex board lines almost entirely on recovered fibre. A primary domestic destination for imported and collected wastepaper.",
    grades: ["OCC 11 & 12", "Mixed paper", "Kraft cuttings", "Grey board waste"],
    logistics: "Road from Delhi NCR; ICD Dadri and Mundra for imports",
  },
  {
    slug: "moradabad",
    name: "Moradabad",
    region: "Uttar Pradesh",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "The brass city — handicraft and hardware manufacturing built on copper alloys. Consumes brass and copper scrap as raw feed and generates machining swarf in return.",
    grades: ["Honey brass", "Brass turnings", "Copper millberry", "Mixed brass ash"],
    logistics: "Road to Delhi NCR; ICD Moradabad",
  },
  {
    slug: "kanpur",
    name: "Kanpur",
    region: "Uttar Pradesh",
    country: "India",
    market: "india",
    role: "source",
    materials: ["textile", "paper"],
    character:
      "Leather, textiles and defence engineering. The tanning and garment base generates cutting waste and trims; older mills contribute a paper and board stream.",
    grades: ["Cotton cutting waste", "Blended fabric trims", "Mixed paper"],
    logistics: "ICD Kanpur; rail to Mundra and Nhava Sheva",
  },
  {
    slug: "noida-greater-noida",
    name: "Noida & Greater Noida",
    region: "Uttar Pradesh",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "paper"],
    character:
      "Electronics assembly, appliances and packaging converters. Generates clean production offcuts and carton waste rather than post-consumer mixed material.",
    grades: ["Aluminium extrusion offcuts", "Copper wire", "OCC 12", "Printers' trim"],
    logistics: "ICD Dadri; road to Delhi NCR",
  },
  {
    slug: "faridabad",
    name: "Faridabad",
    region: "Haryana",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal", "rubber"],
    character:
      "Auto components, tractors and forging. Presses and forging lines generate consistent steel offcuts; rubber component makers generate cured and uncured waste.",
    grades: ["Forging offcuts", "Sheet blanking skeletons", "Cured rubber waste", "Steel turnings"],
    logistics: "ICD Tughlakabad; road to NCR",
  },
  {
    slug: "gurugram-manesar",
    name: "Gurugram & Manesar",
    region: "Haryana",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "rubber"],
    character:
      "Passenger vehicle and two-wheeler assembly with a tier-one supplier belt around it. Offcuts are clean, segregated at source and available on recurring contracts.",
    grades: ["Sheet blanking skeletons", "Aluminium die-cast runners", "Cured rubber trims"],
    logistics: "ICD Tughlakabad and Garhi Harsaru; road to Mundra",
  },
  {
    slug: "bhiwadi-neemrana",
    name: "Bhiwadi & Neemrana",
    region: "Rajasthan",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "paper"],
    character:
      "A Delhi-adjacent manufacturing belt with Japanese and Korean anchor plants. Generates segregated production scrap under formal disposal contracts.",
    grades: ["Sheet cuttings", "Aluminium offcuts", "OCC 12", "Steel skeleton scrap"],
    logistics: "ICD Rewari; road to Mundra and Pipavav",
  },
  {
    slug: "bhilwara",
    name: "Bhilwara",
    region: "Rajasthan",
    country: "India",
    market: "india",
    role: "source",
    materials: ["textile"],
    character:
      "India's synthetic suiting and worsted fabric centre. Weaving and processing generate polyester and blended waste in volumes that suit container programmes.",
    grades: ["Polyester fabric waste", "Blended suiting cuttings", "Yarn waste", "Hard waste"],
    logistics: "ICD Bhilwara; road to Mundra",
  },
  {
    slug: "jodhpur",
    name: "Jodhpur",
    region: "Rajasthan",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "textile"],
    character:
      "Handicraft furniture and steel fabrication for export, alongside a textile processing base. Export packing generates a steady secondary stream.",
    grades: ["MS fabrication offcuts", "Cotton cutting waste", "Mixed paper"],
    logistics: "ICD Jodhpur; road to Mundra",
  },
  {
    slug: "alang-bhavnagar",
    name: "Alang, Bhavnagar",
    region: "Gujarat",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "rubber"],
    character:
      "The world's largest ship-recycling yard. Plate, section and machinery scrap comes off vessels in volumes no manufacturing cluster matches, alongside marine rubber and cable.",
    grades: ["Ship plate scrap", "Re-rollable plate", "Marine cable copper", "Bronze propeller scrap", "Marine rubber"],
    logistics: "Alang anchorage; road to Bhavnagar and Mandi Gobindgarh",
  },
  {
    slug: "jamnagar",
    name: "Jamnagar",
    region: "Gujarat",
    country: "India",
    market: "india",
    role: "demand",
    materials: ["metal"],
    character:
      "The brass parts capital, with thousands of small units machining fittings and fasteners. A structural buyer of copper alloy scrap and a generator of high-yield turnings.",
    grades: ["Honey brass", "Brass turnings", "Copper millberry", "Brass dross"],
    logistics: "Mundra and Kandla ports; road within Saurashtra",
  },
  {
    slug: "surat",
    name: "Surat",
    region: "Gujarat",
    country: "India",
    market: "india",
    role: "source",
    materials: ["textile"],
    character:
      "India's man-made fabric capital, running polyester weaving and processing at national scale. The waste stream is predominantly synthetic rather than cotton, which suits specific buyer specifications.",
    grades: ["Polyester fabric waste", "PSF waste", "Yarn and hard waste", "Saree cutting waste"],
    logistics: "Hazira and Mundra ports; ICD Sachin",
  },
  {
    slug: "morbi",
    name: "Morbi",
    region: "Gujarat",
    country: "India",
    market: "india",
    role: "source",
    materials: ["paper", "metal"],
    character:
      "The ceramic tile cluster, and one of the largest packaging consumers in western India. Carton and kraft waste volumes track tile export shipments.",
    grades: ["OCC 11", "Kraft cuttings", "MS fabrication offcuts"],
    logistics: "Mundra and Kandla ports; road via Rajkot",
  },
  {
    slug: "rajkot",
    name: "Rajkot",
    region: "Gujarat",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "A foundry and castings cluster serving engines, pumps and bearings. Consumes cast and steel scrap as furnace feed and returns machining swarf.",
    grades: ["Cast iron scrap", "Steel turnings and borings", "Foundry returns"],
    logistics: "Mundra and Pipavav ports; ICD Rajkot",
  },
  {
    slug: "ankleshwar-vapi",
    name: "Ankleshwar & Vapi",
    region: "Gujarat",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "paper"],
    character:
      "A chemical and dyestuff corridor where the recoverable stream is plant and drum related rather than production offcut. Material requires contamination checks before acceptance.",
    grades: ["Stainless steel plant scrap", "MS structural", "Drum and liner board"],
    logistics: "Hazira and Nhava Sheva; ICD Vapi",
  },
  {
    slug: "ahmedabad-sanand",
    name: "Ahmedabad & Sanand",
    region: "Gujarat",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "textile", "paper"],
    character:
      "Vehicle assembly at Sanand alongside Ahmedabad's older textile base. The combination gives clean press-shop offcuts and a separate mill textile stream from the same catchment.",
    grades: ["Sheet blanking skeletons", "Cotton mill waste", "OCC 12", "Aluminium offcuts"],
    logistics: "Mundra and Pipavav; ICD Khodiyar",
  },
  {
    slug: "gandhidham-mundra",
    name: "Gandhidham & Mundra",
    region: "Gujarat",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal", "paper", "textile"],
    character:
      "Less a manufacturing cluster than the gateway itself — India's largest private port with the timber, salt and warehousing belt around it. Most western India scrap containers clear here.",
    grades: ["Import container grades", "OCC 11 & 12", "Mixed ferrous"],
    logistics: "Mundra Port; rail to Punjab and NCR",
  },
  {
    slug: "mumbai-taloja",
    name: "Mumbai, Thane & Taloja",
    region: "Maharashtra",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal", "paper", "rubber"],
    character:
      "The MIDC belt from Thane through Taloja mixes engineering, chemicals and packaging, with the country's principal container port adjacent. Trading depth here is as important as generation.",
    grades: ["Mixed ferrous", "Copper and brass", "OCC 11", "Cured rubber waste"],
    logistics: "Nhava Sheva (JNPT); road within MMR",
  },
  {
    slug: "pune-chakan",
    name: "Pune, Chakan & Ranjangaon",
    region: "Maharashtra",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "rubber"],
    character:
      "The largest automotive manufacturing concentration in western India, from OEM press shops to tier-two machining. Offcuts are segregated at source and contracted annually.",
    grades: ["Sheet blanking skeletons", "Steel turnings", "Aluminium die-cast runners", "Cured rubber trims"],
    logistics: "Nhava Sheva; ICD Talegaon and Dighi",
  },
  {
    slug: "jalna",
    name: "Jalna",
    region: "Maharashtra",
    country: "India",
    market: "india",
    role: "demand",
    materials: ["metal"],
    character:
      "A steel re-rolling and induction furnace cluster serving western India's rebar demand. Like Mandi Gobindgarh, it buys scrap rather than producing it.",
    grades: ["HMS 1 & 2", "Shredded steel", "Sponge iron substitute grades", "Rebar cuttings"],
    logistics: "Road from Nhava Sheva and Mundra; ICD Aurangabad",
  },
  {
    slug: "nagpur-butibori",
    name: "Nagpur & Butibori",
    region: "Maharashtra",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "A central-India logistics node with steel, power equipment and paper units. Its position makes it a consolidation point for material moving between north and south.",
    grades: ["MS structural", "Mixed ferrous", "OCC 12"],
    logistics: "ICD Nagpur; rail to Nhava Sheva and Mundra",
  },
  {
    slug: "nashik",
    name: "Nashik",
    region: "Maharashtra",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "rubber"],
    character:
      "Auto components, defence and engineering units across the Satpur and Ambad estates. A reliable source of machined and pressed steel offcuts.",
    grades: ["Steel turnings", "Sheet cuttings", "Cured rubber waste"],
    logistics: "Nhava Sheva; road via Mumbai–Agra corridor",
  },
  {
    slug: "aurangabad",
    name: "Chhatrapati Sambhajinagar (Aurangabad)",
    region: "Maharashtra",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "rubber"],
    character:
      "Two-wheeler, auto component and brewing industry in the DMIC corridor. Press and machining scrap dominates the recoverable stream.",
    grades: ["Sheet blanking skeletons", "Steel turnings", "Aluminium offcuts"],
    logistics: "ICD Aurangabad; road to Nhava Sheva",
  },
  {
    slug: "indore-pithampur",
    name: "Indore & Pithampur",
    region: "Madhya Pradesh",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "paper"],
    character:
      "Central India's principal vehicle and pharmaceutical manufacturing base. Pithampur's press shops and testing facilities generate segregated steel scrap.",
    grades: ["Sheet cuttings", "Steel turnings", "OCC 12", "Aluminium offcuts"],
    logistics: "ICD Pithampur and Mandideep; rail to Mundra",
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    region: "Telangana",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal", "paper", "rubber", "textile"],
    character:
      "Our home market. Balanagar, Jeedimetla, Cherlapally, Uppal, Kattedan and Medchal together carry engineering, pharma packaging and fabrication, and we inspect lots here directly rather than through an agent.",
    grades: ["MS fabrication offcuts", "Steel turnings", "OCC 11 & 12", "Copper and brass", "Cured rubber waste"],
    logistics: "ICD Sanathnagar and Hyderabad; road to Chennai and Krishnapatnam",
  },
  {
    slug: "patancheru-bollaram",
    name: "Patancheru & Bollaram",
    region: "Telangana",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "paper"],
    character:
      "The bulk drug and chemical belt west of Hyderabad. Recoverable material is plant, drum and packaging related, and contamination screening matters more here than grade yield.",
    grades: ["Stainless steel plant scrap", "MS structural", "Drum board", "Liner and kraft"],
    logistics: "ICD Sanathnagar; road via NH-65",
  },
  {
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    region: "Andhra Pradesh",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "An integrated steel plant, a shipyard and a major east coast port in one city. Both a generator of heavy ferrous and a landing point for imported scrap.",
    grades: ["Ship plate scrap", "HMS 1 & 2", "Mill scale and returns", "Structural steel"],
    logistics: "Visakhapatnam Port; rail into the eastern steel belt",
  },
  {
    slug: "chennai-sriperumbudur",
    name: "Chennai, Sriperumbudur & Oragadam",
    region: "Tamil Nadu",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "rubber", "paper"],
    character:
      "India's automotive and electronics export corridor, with vehicle, handset and appliance plants clustered along the Bengaluru highway. Clean, contract-grade offcut volumes.",
    grades: ["Sheet blanking skeletons", "Aluminium die-cast runners", "Copper wire", "OCC 12", "Cured rubber trims"],
    logistics: "Chennai and Kattupalli ports; ICD Irungattukottai",
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    region: "Tamil Nadu",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal", "textile"],
    character:
      "Pump, motor and foundry manufacturing alongside an older cotton spinning base. Foundries buy cast scrap; the spinning mills generate cotton waste separately.",
    grades: ["Cast iron scrap", "Steel turnings", "Copper winding scrap", "Cotton yarn waste"],
    logistics: "Tuticorin and Cochin ports; ICD Coimbatore",
  },
  {
    slug: "tiruppur",
    name: "Tiruppur",
    region: "Tamil Nadu",
    country: "India",
    market: "india",
    role: "source",
    materials: ["textile"],
    character:
      "India's knitwear export capital and the largest single source of cotton garment cutting waste in the country. Volumes are consistent enough to support recurring container programmes.",
    grades: ["Cotton banian cutting waste", "Hosiery clips", "Coloured knit waste", "Yarn waste"],
    logistics: "Tuticorin and Cochin ports; ICD Tiruppur",
  },
  {
    slug: "salem",
    name: "Salem",
    region: "Tamil Nadu",
    country: "India",
    market: "india",
    role: "demand",
    materials: ["metal"],
    character:
      "A stainless and alloy steel centre with rolling capacity built around local ore and ferroalloys. A structural buyer of stainless scrap grades.",
    grades: ["Stainless 304/316 scrap", "Alloy steel scrap", "HMS 1 & 2"],
    logistics: "Chennai and Tuticorin; ICD Salem",
  },
  {
    slug: "thoothukudi",
    name: "Thoothukudi (Tuticorin)",
    region: "Tamil Nadu",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "A copper smelting and port city on the southern coast. Its value in the trade is as a discharge and consolidation point for southern India rather than as a generator.",
    grades: ["Copper scrap", "Mixed ferrous", "OCC 11"],
    logistics: "V.O. Chidambaranar Port; rail to Coimbatore and Madurai",
  },
  {
    slug: "bengaluru-peenya",
    name: "Bengaluru — Peenya, Bommasandra & Jigani",
    region: "Karnataka",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "paper"],
    character:
      "One of Asia's largest small-scale industrial estates plus the aerospace and machine tool base around it. Scrap is high-value and low-volume per unit: precision alloys rather than bulk ferrous.",
    grades: ["Aluminium alloy offcuts", "Stainless turnings", "Copper wire", "OCC 12"],
    logistics: "ICD Whitefield; road to Chennai and Mangaluru",
  },
  {
    slug: "belagavi",
    name: "Belagavi",
    region: "Karnataka",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "A dense aluminium and iron foundry cluster serving automotive castings. Buys ingot-grade aluminium scrap and returns runner and riser scrap.",
    grades: ["Aluminium wheels and cuttings", "Cast iron scrap", "Foundry returns"],
    logistics: "ICD Belagavi; road to Nhava Sheva and Mormugao",
  },
  {
    slug: "hubballi-dharwad",
    name: "Hubballi–Dharwad",
    region: "Karnataka",
    country: "India",
    market: "india",
    role: "source",
    materials: ["metal", "paper"],
    character:
      "A north Karnataka engineering and railway workshop base. Railway overhaul work generates heavy ferrous on predictable disposal cycles.",
    grades: ["Rail and wheel scrap", "MS structural", "Mixed ferrous"],
    logistics: "ICD Hubballi; road to Mormugao and Nhava Sheva",
  },
  {
    slug: "kochi",
    name: "Kochi",
    region: "Kerala",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal", "rubber"],
    character:
      "A shipbuilding, refining and port city in the heart of India's natural rubber belt. The rubber processing base here is unusual in being fed by domestic plantation output.",
    grades: ["Ship plate scrap", "Marine cable copper", "Tyre scrap", "Reclaim rubber feed"],
    logistics: "Cochin Port and Vallarpadam ICTT",
  },
  {
    slug: "howrah",
    name: "Howrah",
    region: "West Bengal",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "The oldest engineering and foundry belt in eastern India, historically called the Sheffield of the East. Thousands of small furnaces and a long-established scrap trade sit side by side.",
    grades: ["Cast iron scrap", "Mixed ferrous", "Steel turnings", "Foundry returns"],
    logistics: "Kolkata and Haldia ports",
  },
  {
    slug: "durgapur-asansol",
    name: "Durgapur & Asansol",
    region: "West Bengal",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "An integrated steel and coal belt with sponge iron and re-rolling capacity layered on top. Heavy ferrous both arrives and departs here.",
    grades: ["HMS 1 & 2", "Mill returns", "Structural steel", "Rail scrap"],
    logistics: "Haldia and Kolkata; rail to the eastern steel corridor",
  },
  {
    slug: "jamshedpur",
    name: "Jamshedpur",
    region: "Jharkhand",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "India's original steel city, with the country's largest private integrated works and a deep tier-one supplier base around it. Generates mill returns and consumes purchased scrap.",
    grades: ["Mill returns", "HMS 1 & 2", "Busheling", "Structural steel"],
    logistics: "Haldia and Paradip; rail within the eastern belt",
  },
  {
    slug: "raipur-bhilai",
    name: "Raipur, Bhilai & Urla",
    region: "Chhattisgarh",
    country: "India",
    market: "india",
    role: "demand",
    materials: ["metal"],
    character:
      "The centre of India's sponge iron and induction furnace industry, with hundreds of re-rolling mills in the Urla and Siltara estates. A major inland scrap consumer.",
    grades: ["HMS 1 & 2", "Shredded steel", "Rebar cuttings", "Mill returns"],
    logistics: "Rail from Paradip and Visakhapatnam; ICD Raipur",
  },
  {
    slug: "rourkela-angul",
    name: "Rourkela, Angul & Jharsuguda",
    region: "Odisha",
    country: "India",
    market: "india",
    role: "both",
    materials: ["metal"],
    character:
      "An integrated steel and primary aluminium belt. Aluminium smelting here makes it one of the few Indian clusters that buys non-ferrous scrap at smelter scale.",
    grades: ["Aluminium scrap", "HMS 1 & 2", "Mill returns", "Structural steel"],
    logistics: "Paradip and Dhamra ports; rail to the eastern corridor",
  },
  // --------------------------------------------------------------- Europe
  {
    slug: "brescia",
    name: "Brescia & Bergamo",
    region: "Lombardy",
    country: "Italy",
    market: "europe",
    role: "demand",
    materials: ["metal"],
    character:
      "The densest concentration of electric arc furnaces in Europe, and the continent's reference point for scrap pricing. Mills here run on purchased scrap by design, not as a supplement.",
    grades: ["E3 / HMS equivalent", "E8 busheling", "E40 shredded", "Turnings E5H"],
    logistics: "Road from Northern European yards; Genoa and Trieste for deep sea",
  },
  {
    slug: "ruhr",
    name: "Ruhr — Duisburg, Essen & Dortmund",
    region: "North Rhine-Westphalia",
    country: "Germany",
    market: "europe",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "Europe's historic steel heartland, with Duisburg the largest inland port in the world. Both a producer of mill returns and the collection point for scrap moving down the Rhine.",
    grades: ["E1 / E3 ferrous", "E8 new arisings", "Shredded steel", "OCC 1.04"],
    logistics: "Duisburg inland port; Rhine barge to Rotterdam and Antwerp",
  },
  {
    slug: "rotterdam",
    name: "Rotterdam & Europoort",
    region: "South Holland",
    country: "Netherlands",
    market: "europe",
    role: "both",
    materials: ["metal", "paper", "textile"],
    character:
      "The primary deep-sea export gateway for European scrap. Its role in the trade is aggregation and loading rather than generation — most containers leaving Northern Europe clear here.",
    grades: ["HMS 1 & 2 export grades", "Shredded steel", "OCC 1.04", "Mixed paper 1.02"],
    logistics: "Port of Rotterdam; Rhine barge from Germany and Switzerland",
  },
  {
    slug: "antwerp",
    name: "Antwerp",
    region: "Flanders",
    country: "Belgium",
    market: "europe",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "Europe's principal non-ferrous trading and warehousing hub, with a petrochemical cluster attached. Copper, aluminium and lead move through here in trading volumes.",
    grades: ["Copper millberry", "Aluminium taint/tabor", "Lead scrap", "OCC 1.04"],
    logistics: "Port of Antwerp-Bruges; barge and rail into the Ruhr",
  },
  {
    slug: "silesia",
    name: "Silesia — Katowice, Gliwice & Dąbrowa Górnicza",
    region: "Silesian Voivodeship",
    country: "Poland",
    market: "europe",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "Poland's coal, steel and automotive core, and the largest industrial concentration in Central Europe. Growing EAF capacity has made it a net scrap buyer.",
    grades: ["E3 ferrous", "E8 busheling", "Shredded steel", "OCC 1.04"],
    logistics: "Gdańsk and Gdynia ports; rail via the Baltic corridor",
  },
  {
    slug: "sheffield-rotherham",
    name: "Sheffield & Rotherham",
    region: "South Yorkshire",
    country: "United Kingdom",
    market: "europe",
    role: "both",
    materials: ["metal"],
    character:
      "The UK's specialty and stainless steel centre, with forging and alloy melting concentrated in the Don Valley. Buys segregated alloy grades rather than bulk ferrous.",
    grades: ["Stainless 304/316", "Alloy and tool steel scrap", "Nickel alloy turnings"],
    logistics: "Immingham and Hull; road within the M1 corridor",
  },
  {
    slug: "west-midlands",
    name: "West Midlands & Black Country",
    region: "England",
    country: "United Kingdom",
    market: "europe",
    role: "source",
    materials: ["metal", "rubber"],
    character:
      "The UK's metal-bashing heartland — pressings, castings and automotive supply concentrated around Birmingham and Wolverhampton. A generator rather than a consumer.",
    grades: ["Sheet blanking skeletons", "Aluminium castings", "Copper and brass", "Cured rubber waste"],
    logistics: "Felixstowe and Southampton; road via the M6",
  },
  {
    slug: "bilbao-basque",
    name: "Bilbao & the Basque Country",
    region: "País Vasco",
    country: "Spain",
    market: "europe",
    role: "demand",
    materials: ["metal"],
    character:
      "Spain's steel and machine tool centre, running long product EAF capacity around Bilbao and Vitoria. A consistent buyer of imported ferrous.",
    grades: ["E3 ferrous", "E8 busheling", "Shredded steel", "Rebar cuttings"],
    logistics: "Port of Bilbao and Pasajes; road into southern France",
  },
  {
    slug: "ostrava",
    name: "Ostrava",
    region: "Moravian-Silesian",
    country: "Czechia",
    market: "europe",
    role: "both",
    materials: ["metal"],
    character:
      "The Czech steel and heavy engineering centre, historically the country's iron works. Sits directly on the Polish Silesian belt and trades across the border.",
    grades: ["E3 ferrous", "Mill returns", "Structural steel", "Cast iron"],
    logistics: "Rail to Gdańsk and Koper; road into Silesia",
  },
  {
    slug: "galati",
    name: "Galați",
    region: "Galați County",
    country: "Romania",
    market: "europe",
    role: "demand",
    materials: ["metal"],
    character:
      "Romania's largest integrated steel works, sited on the Danube with river access to Central Europe. Draws scrap from the lower Danube basin.",
    grades: ["E3 ferrous", "HMS 1 & 2", "Shredded steel"],
    logistics: "Danube barge; Constanța port",
  },
  {
    slug: "constanta",
    name: "Constanța",
    region: "Constanța County",
    country: "Romania",
    market: "europe",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "The largest Black Sea port and the natural loading point for scrap moving from Central Europe toward Turkey and the Eastern Mediterranean.",
    grades: ["HMS 1 & 2 export grades", "Shredded steel", "OCC 1.04"],
    logistics: "Port of Constanța; Danube barge from Serbia and Hungary",
  },
  {
    slug: "dunkirk-fos",
    name: "Dunkirk & Fos-sur-Mer",
    region: "Hauts-de-France & Provence",
    country: "France",
    market: "europe",
    role: "both",
    materials: ["metal"],
    character:
      "France's two integrated steel sites, one on the Channel and one on the Mediterranean. Between them they set French scrap demand and give access to two sea basins.",
    grades: ["E3 ferrous", "E8 new arisings", "Shredded steel"],
    logistics: "Ports of Dunkerque and Marseille-Fos",
  },
  {
    slug: "hamburg-bremen",
    name: "Hamburg & Bremen",
    region: "Northern Germany",
    country: "Germany",
    market: "europe",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "Germany's two major seaports, with copper refining at Hamburg and steel at Bremen. The main container loading points for German scrap exports.",
    grades: ["Copper millberry and birch/cliff", "E3 ferrous", "OCC 1.04", "Mixed paper 1.02"],
    logistics: "Ports of Hamburg and Bremerhaven; Elbe and Weser barge",
  },
  {
    slug: "goteborg-nordics",
    name: "Gothenburg, Luleå & Oxelösund",
    region: "Nordics",
    country: "Sweden",
    market: "europe",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "Scandinavian steel and pulp. Swedish mills run clean, well-documented material and the region's recovered paper is prized for fibre quality.",
    grades: ["E8 busheling", "Clean mill returns", "Sorted office paper", "OCC 1.04"],
    logistics: "Ports of Gothenburg and Luleå; Baltic feeder to Rotterdam",
  },
  {
    slug: "izmir-aliaga",
    name: "Aliağa, İzmir",
    region: "İzmir Province",
    country: "Türkiye",
    market: "europe",
    role: "demand",
    materials: ["metal"],
    character:
      "The largest scrap-importing complex in the world, combining EAF steel mills with a ship-recycling yard on the same stretch of coast. Turkey sets the global import price and Aliağa is where much of it lands.",
    grades: ["HMS 1 & 2 80:20", "Shredded steel", "Busheling", "P&S plate"],
    logistics: "Aliağa and Nemrut Bay terminals; deep sea from EU, UK and US",
  },
  {
    slug: "iskenderun",
    name: "İskenderun",
    region: "Hatay Province",
    country: "Türkiye",
    market: "europe",
    role: "demand",
    materials: ["metal"],
    character:
      "Turkey's eastern Mediterranean steel cluster, with flat and long product capacity feeding regional construction. A primary discharge point for cargo-sized ferrous lots.",
    grades: ["HMS 1 & 2 80:20", "Shredded steel", "Bonus grade", "Turnings"],
    logistics: "İskenderun Bay terminals; road into southeast Anatolia",
  },
  {
    slug: "kocaeli-gebze",
    name: "Kocaeli & Gebze",
    region: "Marmara",
    country: "Türkiye",
    market: "europe",
    role: "both",
    materials: ["metal", "paper", "textile"],
    character:
      "Turkey's densest manufacturing corridor east of Istanbul — automotive, paper and chemicals. Generates clean production offcuts and hosts significant recovered-paper capacity.",
    grades: ["E8 new arisings", "OCC 1.04", "Mixed paper", "Cotton cutting waste"],
    logistics: "Kocaeli and Ambarlı ports; road via the TEM corridor",
  },
  // ---------------------------------------------------------- Middle East
  {
    slug: "jebel-ali",
    name: "Jebel Ali & JAFZA",
    region: "Dubai",
    country: "United Arab Emirates",
    market: "middle-east",
    role: "both",
    materials: ["metal", "paper", "textile", "rubber"],
    character:
      "The largest man-made harbour in the world and the region's re-export engine. Material is consolidated, graded and reshipped here more often than it is consumed, which makes it the natural staging point for GCC trade.",
    grades: ["HMS 1 & 2", "Copper and aluminium mixed", "OCC 11", "Mixed textiles"],
    logistics: "Jebel Ali Port; road corridor to Saudi Arabia and Oman",
  },
  {
    slug: "sharjah-industrial",
    name: "Sharjah Industrial Areas & Hamriyah",
    region: "Sharjah",
    country: "United Arab Emirates",
    market: "middle-east",
    role: "both",
    materials: ["metal", "rubber", "paper"],
    character:
      "The densest concentration of scrap yards and processors in the UAE, spread across Industrial Areas 1–18 and the Hamriyah Free Zone. Where most Emirates-collected material is actually sorted and baled.",
    grades: ["Mixed ferrous", "Copper wire", "Aluminium sections", "Tyre scrap", "OCC 11"],
    logistics: "Hamriyah and Khorfakkan ports; road to Jebel Ali",
  },
  {
    slug: "musaffah-abu-dhabi",
    name: "Musaffah & ICAD, Abu Dhabi",
    region: "Abu Dhabi",
    country: "United Arab Emirates",
    market: "middle-east",
    role: "both",
    materials: ["metal"],
    character:
      "Abu Dhabi's heavy industrial base, combining steel rolling, oilfield fabrication and marine yards across ICAD I–III. Generates structural and pipe scrap on project cycles.",
    grades: ["Structural steel", "Pipe and casing scrap", "Stainless plant scrap", "Rebar cuttings"],
    logistics: "Khalifa Port and Zayed Port; road to Jebel Ali",
  },
  {
    slug: "kezad",
    name: "KEZAD (Khalifa Economic Zone)",
    region: "Abu Dhabi",
    country: "United Arab Emirates",
    market: "middle-east",
    role: "demand",
    materials: ["metal"],
    character:
      "The UAE's primary aluminium smelting and downstream cluster, anchored to a deep-water port. Buys aluminium scrap at smelter scale rather than trading volumes.",
    grades: ["Aluminium taint/tabor", "Aluminium extrusion 6063", "Wheels", "UBC"],
    logistics: "Khalifa Port",
  },
  {
    slug: "ras-al-khaimah",
    name: "Ras Al Khaimah — Al Ghail & RAK Maritime City",
    region: "Ras Al Khaimah",
    country: "United Arab Emirates",
    market: "middle-east",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "Ceramics, cement and steel rolling in the northern Emirates, with a dedicated bulk port. Its packaging consumption makes it a steady recovered-paper source.",
    grades: ["Rebar cuttings", "Mixed ferrous", "OCC 11", "Kraft cuttings"],
    logistics: "RAK Maritime City and Saqr Port",
  },
  {
    slug: "fujairah",
    name: "Fujairah",
    region: "Fujairah",
    country: "United Arab Emirates",
    market: "middle-east",
    role: "both",
    materials: ["metal"],
    character:
      "The only UAE emirate on the Gulf of Oman, outside the Strait of Hormuz. Bunkering and ship services generate marine ferrous, and its position shortens deep-sea routing.",
    grades: ["Ship and marine scrap", "Mixed ferrous", "Marine cable copper"],
    logistics: "Port of Fujairah; road to Sharjah and Dubai",
  },
  {
    slug: "jubail",
    name: "Jubail Industrial City",
    region: "Eastern Province",
    country: "Saudi Arabia",
    market: "middle-east",
    role: "both",
    materials: ["metal"],
    character:
      "The largest industrial city in the Middle East, built around petrochemicals, steel and fabrication. Plant turnarounds release large, well-documented lots on scheduled cycles.",
    grades: ["Stainless plant scrap", "Pipe and casing", "Structural steel", "Alloy scrap"],
    logistics: "King Fahd Industrial Port; road to Riyadh and Dammam",
  },
  {
    slug: "dammam",
    name: "Dammam Industrial Cities",
    region: "Eastern Province",
    country: "Saudi Arabia",
    market: "middle-east",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "The commercial and light industrial centre of the Eastern Province, with the kingdom's main scrap yard concentration attached to the 2nd Industrial City.",
    grades: ["Mixed ferrous", "Copper and aluminium", "OCC 11", "Rebar cuttings"],
    logistics: "King Abdulaziz Port, Dammam; road to Bahrain and Riyadh",
  },
  {
    slug: "yanbu",
    name: "Yanbu Industrial City",
    region: "Al Madinah",
    country: "Saudi Arabia",
    market: "middle-east",
    role: "source",
    materials: ["metal"],
    character:
      "The kingdom's Red Sea petrochemical and refining complex. Recoverable material is plant and pipeline related, and its coast gives direct access to Suez routing.",
    grades: ["Pipe and casing scrap", "Stainless plant scrap", "Structural steel"],
    logistics: "Yanbu Commercial and King Fahd Industrial Ports",
  },
  {
    slug: "riyadh-industrial",
    name: "Riyadh Industrial Cities & Sudair",
    region: "Riyadh",
    country: "Saudi Arabia",
    market: "middle-east",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "Inland manufacturing and construction supply for the capital, with Sudair added as a newer large-format zone. Demolition and construction cycles drive the ferrous stream.",
    grades: ["Rebar cuttings", "Structural steel", "Mixed ferrous", "OCC 11"],
    logistics: "Riyadh Dry Port; rail and road from Dammam and Jeddah",
  },
  {
    slug: "jeddah",
    name: "Jeddah & King Abdullah Economic City",
    region: "Makkah",
    country: "Saudi Arabia",
    market: "middle-east",
    role: "both",
    materials: ["metal", "paper", "textile"],
    character:
      "The Red Sea commercial gateway, with the kingdom's largest container port and a broad consumer goods base behind it. Packaging and textile streams are stronger here than in the east.",
    grades: ["Mixed ferrous", "OCC 11", "Mixed paper", "Mixed textiles"],
    logistics: "Jeddah Islamic Port and King Abdullah Port",
  },
  {
    slug: "sohar",
    name: "Sohar Port & Freezone",
    region: "Al Batinah North",
    country: "Oman",
    market: "middle-east",
    role: "demand",
    materials: ["metal"],
    character:
      "Oman's industrial anchor, combining steel, aluminium smelting and a deep-water port outside the Strait of Hormuz. A genuine consumer of both ferrous and aluminium scrap.",
    grades: ["HMS 1 & 2", "Aluminium taint/tabor", "UBC", "Shredded steel"],
    logistics: "Port of Sohar; road to the UAE and Muscat",
  },
  {
    slug: "duqm",
    name: "Duqm SEZAD",
    region: "Al Wusta",
    country: "Oman",
    market: "middle-east",
    role: "both",
    materials: ["metal"],
    character:
      "A dry dock and special economic zone on the Arabian Sea, positioned for vessel repair and heavy industry. Ship repair work is the main generator.",
    grades: ["Ship and marine scrap", "Structural steel", "Pipe scrap"],
    logistics: "Port of Duqm; direct Arabian Sea routing to India",
  },
  {
    slug: "mesaieed",
    name: "Mesaieed Industrial City",
    region: "Al Wakrah",
    country: "Qatar",
    market: "middle-east",
    role: "demand",
    materials: ["metal"],
    character:
      "Qatar's heavy industrial zone, home to the country's steel and petrochemical capacity. Steelmaking here buys scrap to supplement direct-reduced iron.",
    grades: ["HMS 1 & 2", "Shredded steel", "Rebar cuttings", "Pipe scrap"],
    logistics: "Mesaieed Port and Hamad Port",
  },
  {
    slug: "amghara",
    name: "Amghara",
    region: "Al Jahra",
    country: "Kuwait",
    market: "middle-east",
    role: "both",
    materials: ["metal", "rubber"],
    character:
      "Kuwait's designated scrap and salvage area, where the country's collected metal and end-of-life vehicles are concentrated for sorting. A trading area rather than a manufacturing one.",
    grades: ["Mixed ferrous", "Motor scrap", "Copper and aluminium", "Tyre scrap"],
    logistics: "Shuwaikh and Shuaiba ports",
  },
  {
    slug: "shuaiba",
    name: "Shuaiba & Mina Abdullah",
    region: "Al Ahmadi",
    country: "Kuwait",
    market: "middle-east",
    role: "source",
    materials: ["metal"],
    character:
      "Kuwait's refining and petrochemical belt on the southern coast. Plant maintenance and turnaround work releases alloy and pipe scrap in documented lots.",
    grades: ["Pipe and casing scrap", "Stainless plant scrap", "Structural steel"],
    logistics: "Shuaiba Port",
  },
  {
    slug: "hidd-bahrain",
    name: "Hidd & Askar",
    region: "Muharraq & Southern",
    country: "Bahrain",
    market: "middle-east",
    role: "demand",
    materials: ["metal"],
    character:
      "Bahrain's industrial core, anchored by one of the world's largest single-site aluminium smelters and a pelletising plant. Aluminium scrap demand here is structural.",
    grades: ["Aluminium taint/tabor", "UBC", "Extrusion 6063", "HMS 1 & 2"],
    logistics: "Khalifa Bin Salman Port; causeway to Dammam",
  },
  {
    slug: "aqaba",
    name: "Aqaba (ASEZA)",
    region: "Aqaba",
    country: "Jordan",
    market: "middle-east",
    role: "both",
    materials: ["metal", "paper"],
    character:
      "Jordan's only seaport and a special economic zone, serving as the inland Levant's access to the Red Sea. Primarily a transit and consolidation point.",
    grades: ["Mixed ferrous", "Rebar cuttings", "OCC 11"],
    logistics: "Port of Aqaba; road to Amman and Iraq",
  },
  {
    slug: "amman-zarqa",
    name: "Amman — Sahab & Zarqa",
    region: "Amman & Zarqa",
    country: "Jordan",
    market: "middle-east",
    role: "source",
    materials: ["metal", "paper", "textile"],
    character:
      "Jordan's manufacturing belt, covering the Sahab and Abdullah II estates plus the Zarqa refinery area. Garment production for export gives it an unusual textile stream for the region.",
    grades: ["Mixed ferrous", "Cotton cutting waste", "OCC 11", "Copper wire"],
    logistics: "Road to Aqaba; ICD Amman",
  },
  {
    slug: "suez-canal-zone",
    name: "Suez Canal Economic Zone",
    region: "Suez & Port Said",
    country: "Egypt",
    market: "middle-east",
    role: "both",
    materials: ["metal", "paper", "textile"],
    character:
      "A special economic zone spanning both ends of the canal at Ain Sokhna and East Port Said. Its value is position: material can be worked between Mediterranean and Red Sea routing.",
    grades: ["HMS 1 & 2", "Rebar cuttings", "OCC 11", "Cotton waste"],
    logistics: "Ain Sokhna and East Port Said terminals",
  },
  {
    slug: "tenth-of-ramadan",
    name: "10th of Ramadan & 6th of October",
    region: "Sharqia & Giza",
    country: "Egypt",
    market: "middle-east",
    role: "source",
    materials: ["metal", "textile", "paper"],
    character:
      "Egypt's two largest planned industrial cities, flanking Cairo. Textiles, appliances and packaging converters generate a broad, mixed recoverable stream.",
    grades: ["Sheet cuttings", "Cotton cutting waste", "OCC 11", "Mixed paper"],
    logistics: "Road to Alexandria and Ain Sokhna",
  },
  {
    slug: "basra",
    name: "Basra",
    region: "Basra Governorate",
    country: "Iraq",
    market: "middle-east",
    role: "both",
    materials: ["metal"],
    character:
      "Iraq's port and oilfield centre. Oilfield service work and reconstruction generate heavy ferrous, though documentation and inspection requirements are stricter than elsewhere in the region.",
    grades: ["Pipe and casing scrap", "Structural steel", "Mixed ferrous"],
    logistics: "Umm Qasr Port; road to Kuwait",
  },
];

export const marketNames: Record<Market, string> = {
  india: "India",
  europe: "Europe",
  "middle-east": "Middle East",
};

export const roleCopy: Record<IndustrialArea["role"], string> = {
  source: "We buy here",
  demand: "We supply here",
  both: "We buy and supply here",
};

export function getIndustrialArea(slug: string) {
  return industrialAreas.find((area) => area.slug === slug);
}

export function areasByMarket(market: Market) {
  return industrialAreas.filter((area) => area.market === market);
}

/**
 * Neighbours for internal linking: same market first, preferring areas that
 * share a material stream, so the related list is a real trade relationship
 * rather than an arbitrary set of links.
 */
export function relatedAreas(area: IndustrialArea, limit = 4) {
  const sameMarket = industrialAreas.filter(
    (item) => item.slug !== area.slug && item.market === area.market,
  );
  const scored = sameMarket
    .map((item) => ({
      item,
      shared: item.materials.filter((material) => area.materials.includes(material)).length,
      sameCountry: item.country === area.country ? 1 : 0,
    }))
    .sort((a, b) => b.shared - a.shared || b.sameCountry - a.sameCountry);
  return scored.slice(0, limit).map(({ item }) => item);
}

/** Short labels for the material chips on listing cards. */
export const materialShortNames: Record<MaterialSlug, string> = {
  metal: "Metal",
  rubber: "Rubber",
  textile: "Textile",
  paper: "Paper",
};

/**
 * A flat list of 47 Indian areas is unscannable, so listings subgroup.
 * Within India the country is constant and the state is the useful divider;
 * across Europe and the Middle East it is the country.
 */
export function groupKey(area: IndustrialArea) {
  return area.market === "india" ? area.region : area.country;
}

export function groupAreas(areas: IndustrialArea[]) {
  const groups: { key: string; areas: IndustrialArea[] }[] = [];
  for (const area of areas) {
    const key = groupKey(area);
    const last = groups.at(-1);
    if (last?.key === key) last.areas.push(area);
    else groups.push({ key, areas: [area] });
  }
  return groups;
}
