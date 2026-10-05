/* Redwater Motors — shared site script. Static prototype: no backend, forms are simulated. */
(function () {
  'use strict';

  /* ---------- constants & storage ---------- */
  var PHONE = '(402) 555-0148', PHONE_TEL = '+14025550148';
  var TEXTNUM = '(402) 555-0149', TEXT_TEL = '+14025550149';
  var EMAIL = 'hello@redwatermotors.example';

  function storeGet(k, d) { try { var v = localStorage.getItem('rw.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function storeSet(k, v) { try { localStorage.setItem('rw.' + k, JSON.stringify(v)); } catch (e) {} }
  function sessGet(k, d) { try { var v = sessionStorage.getItem('rw.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function sessSet(k, v) { try { sessionStorage.setItem('rw.' + k, JSON.stringify(v)); } catch (e) {} }

  var theme = storeGet('theme', null);
  if (theme) document.documentElement.setAttribute('data-theme', theme);

  /* ---------- icons ---------- */
  var ICONS = {
    phone: '<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    message: '<path d="M4 5h16v11H9l-5 4z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    truck: '<path d="M2 6h12v10H2z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    exchange: '<path d="M4 9h13l-3-3M20 15H7l3 3"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
    expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    play: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4-2.5z" fill="currentColor"/>',
    flame: '<path d="M12 3c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-5 0 2 1 3 2 3 0-3 0-5 1-8z"/>',
    device: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
    gauge: '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    power: '<path d="M12 3v8"/><path d="M6.3 7a8 8 0 1 0 11.4 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2.2.6 3.5 2.8 3.5 6"/>',
    music: '<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    thermo: '<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2M16 12v4"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    key: '<circle cx="8" cy="14" r="4"/><path d="M11 11l9-9M17 5l2 2M15 7l2 2"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    compare: '<rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/>'
  };
  function icon(name, size, cls) {
    size = size || 20;
    return '<svg class="' + (cls || '') + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
  }
  var STAR = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor"/></svg>';
  var LOGO = '<svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><rect width="36" height="36" rx="10" fill="#1C1C1C"/><path d="M8 26 C12 18, 19 13.5, 28 11" stroke="#F26B1D" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M9 30 C15 23, 21 20, 28 18.5" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.75"/></svg>';

  /* ---------- data ---------- */
  var BODIES = [
    { key: 'suv', name: 'SUVs', one: 'SUV', blurb: 'Room for the family, the dog and the Costco run, with all-wheel drive for Nebraska winters.' },
    { key: 'truck', name: 'Trucks', one: 'truck', blurb: 'Half-ton and midsize pickups, inspected for towing and ready for real work.' },
    { key: 'sedan', name: 'Sedans', one: 'sedan', blurb: 'Efficient, comfortable daily drivers that are easy on fuel and insurance.' },
    { key: 'coupe', name: 'Coupes and convertibles', one: 'coupe', blurb: 'Two-door fun, from weekend roadsters to V8 convertibles.' },
    { key: 'van', name: 'Vans and minivans', one: 'van', blurb: 'Sliding doors, third rows and space for car seats, gear and grandparents.' },
    { key: 'electric', name: 'Electric and hybrid', one: 'electric or hybrid', blurb: 'Fewer fuel stops, lower running costs, with battery health checked on every car.' }
  ];
  var BODY = {}; BODIES.forEach(function (b) { BODY[b.key] = b; });

  var F = {
    heat: 'Heated front seats', cp: 'Apple CarPlay and Android Auto', cam: 'Backup camera', acc: 'Adaptive cruise control',
    lane: 'Lane keeping assist', bsm: 'Blind spot monitoring', roof: 'Power moonroof', push: 'Push-button start', zone: 'Dual-zone climate',
    tow: 'Tow package', third: 'Third-row seating', slide: 'Power sliding doors', lift: 'Power liftgate', remote: 'Remote start',
    audio: 'Premium audio', manual: 'Manual transmission', glass: 'Panoramic glass roof', key: 'Keyless entry', cool: 'Ventilated seats', top: 'Power soft top', bed: 'Spray-in bedliner', awdx: 'Off-road package'
  };
  var V = [
    { id: 1, y: 2021, make: 'Honda', model: 'CR-V', trim: 'EX', body: 'suv', price: 24900, miles: 41200, fuel: 'Gas', drive: 'AWD', trans: 'CVT automatic', engine: '1.5L turbo 4-cylinder', mpg: '27 city / 32 hwy', ext: 'Platinum White Pearl', hex: '#ECECE7', fam: 'White', int: 'Black cloth', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Inspected', photos: 24, listed: 3, feats: ['heat', 'cp', 'cam', 'acc', 'lane', 'roof', 'push', 'zone'], desc: ['This one-owner CR-V spent its life in Lincoln and came to us as a trade-in with a full dealer service file. The cloth seats are clean, the moonroof seals are tight, and it rides on a near-new set of all-season tires.', 'The EX trim adds heated seats and Honda Sensing driver assists. All-wheel drive makes it an easy pick for Midwest winters.'] },
    { id: 2, y: 2020, make: 'Ford', model: 'F-150', trim: 'XLT SuperCrew', body: 'truck', price: 31450, miles: 58900, fuel: 'Gas', drive: '4WD', trans: '10-speed automatic', engine: '5.0L V8', mpg: '17 city / 23 hwy', ext: 'Agate Black', hex: '#1F2228', fam: 'Black', int: 'Medium Earth Gray cloth', seats: 6, doors: 4, loc: 'Ships nationwide', badge: 'Price drop', photos: 31, listed: 12, feats: ['tow', 'cp', 'cam', 'remote', 'bed', 'push'], desc: ['A clean SuperCrew with the 5.0 V8 and the factory trailer tow package, including the integrated brake controller. The spray-in liner kept the bed in excellent shape.', 'We just lowered the price by $1,200 after it sat through a slow month. Same truck, better deal.'] },
    { id: 3, y: 2022, make: 'Toyota', model: 'Camry', trim: 'SE', body: 'sedan', price: 23700, miles: 29800, fuel: 'Gas', drive: 'FWD', trans: '8-speed automatic', engine: '2.5L 4-cylinder', mpg: '28 city / 39 hwy', ext: 'Celestial Silver', hex: '#B8BDC3', fam: 'Silver', int: 'Black SofTex', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Just arrived', photos: 22, listed: 1, feats: ['cp', 'acc', 'lane', 'cam', 'push', 'bsm'], desc: ['Low-mileage Camry SE that was a commuter car for an Omaha nurse, with every oil change done on time. The sport seats and paddle shifters make it a little more fun than the average sedan.', 'Close to 40 mpg on the highway and Toyota reliability. It will not last long.'] },
    { id: 4, y: 2019, make: 'Chevrolet', model: 'Tahoe', trim: 'LT', body: 'suv', price: 34900, miles: 67300, fuel: 'Gas', drive: '4WD', trans: '6-speed automatic', engine: '5.3L V8', mpg: '16 city / 22 hwy', ext: 'Blue Velvet', hex: '#29344F', fam: 'Blue', int: 'Jet Black leather', seats: 8, doors: 4, loc: 'Ships nationwide', badge: 'Price drop', photos: 30, listed: 20, feats: ['third', 'tow', 'heat', 'cp', 'lift', 'cam'], desc: ['Eight-passenger Tahoe with the leather package and a working power liftgate. The third row folds flat, which makes it as useful for hauling as it is for carpools.', 'It tows up to 8,400 pounds with the factory hitch and comes with a fresh transmission service.'] },
    { id: 5, y: 2021, make: 'Tesla', model: 'Model 3', trim: 'Long Range', body: 'electric', shape: 'fastback', price: 27800, miles: 38400, fuel: 'Electric', drive: 'AWD', trans: 'Single-speed', engine: 'Dual motor', mpg: '134 city / 126 hwy MPGe', ext: 'Deep Blue Metallic', hex: '#22406F', fam: 'Blue', int: 'Black synthetic leather', seats: 5, doors: 4, loc: 'Ships nationwide', badge: 'Inspected', photos: 26, listed: 6, feats: ['glass', 'heat', 'cam', 'key', 'audio', 'acc'], desc: ['Dual-motor Long Range with battery health tested at 92 percent of original capacity, so expect around 300 miles on a full charge. It includes the mobile charging cable.', 'Quick, quiet and cheap to run. Ask us about charger installation partners in your area.'] },
    { id: 6, y: 2020, make: 'Honda', model: 'Odyssey', trim: 'EX-L', body: 'van', price: 26500, miles: 52100, fuel: 'Gas', drive: 'FWD', trans: '10-speed automatic', engine: '3.5L V6', mpg: '19 city / 28 hwy', ext: 'Modern Steel', hex: '#5A5F67', fam: 'Gray', int: 'Gray leather', seats: 8, doors: 4, loc: 'Omaha, NE', badge: 'Inspected', photos: 28, listed: 9, feats: ['third', 'slide', 'heat', 'cp', 'cam', 'roof'], desc: ['A well-kept Odyssey from a family of five who moved up to a larger SUV. The Magic Slide second row and leather are in great shape, and there are no stains we could find.', 'Both power sliding doors and the liftgate were serviced during inspection.'] },
    { id: 7, y: 2018, make: 'Ford', model: 'Mustang', trim: 'GT Premium Convertible', body: 'coupe', price: 28900, miles: 34700, fuel: 'Gas', drive: 'RWD', trans: '10-speed automatic', engine: '5.0L V8', mpg: '15 city / 25 hwy', ext: 'Race Red', hex: '#B3131C', fam: 'Red', int: 'Ebony leather', seats: 4, doors: 2, loc: 'Ships nationwide', badge: 'Inspected', photos: 25, listed: 15, feats: ['top', 'cool', 'audio', 'cam', 'cp', 'key'], desc: ['A garage-kept GT convertible that only came out on sunny weekends. The power top is quiet and leak-free, and the leather seats are both heated and cooled.', 'The 5.0 V8 sounds exactly how you want it to. It has a clean title and one previous owner.'] },
    { id: 8, y: 2022, make: 'Toyota', model: 'RAV4 Hybrid', trim: 'XLE', body: 'electric', shape: 'suv', price: 30200, miles: 27500, fuel: 'Hybrid', drive: 'AWD', trans: 'eCVT automatic', engine: '2.5L 4-cylinder hybrid', mpg: '41 city / 38 hwy', ext: 'Blueprint', hex: '#2B4C7E', fam: 'Blue', int: 'Black fabric', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Just arrived', photos: 25, listed: 2, feats: ['heat', 'cp', 'acc', 'lane', 'lift', 'roof'], desc: ['Hybrid RAV4s are hard to find, and this XLE has low miles and a spotless history. Expect around 40 mpg around town with the confidence of all-wheel drive.', 'The hybrid battery passed its health check and is still covered by Toyota\'s hybrid warranty.'] },
    { id: 9, y: 2019, make: 'Ram', model: '1500', trim: 'Big Horn Crew Cab', body: 'truck', price: 29750, miles: 61800, fuel: 'Gas', drive: '4WD', trans: '8-speed automatic', engine: '5.7L V8', mpg: '15 city / 22 hwy', ext: 'Granite Crystal', hex: '#4A4E54', fam: 'Gray', int: 'Black cloth', seats: 6, doors: 4, loc: 'Omaha, NE', badge: 'Inspected', photos: 27, listed: 18, feats: ['tow', 'remote', 'cp', 'cam', 'push', 'bed'], desc: ['The Ram rides better than any half-ton we have driven. This Big Horn has the 5.7 V8 and factory tow hitch, and the 8.4-inch touchscreen works perfectly.', 'New front brakes and an alignment were done during inspection.'] },
    { id: 10, y: 2021, make: 'Hyundai', model: 'Elantra', trim: 'SEL', body: 'sedan', price: 17900, miles: 33600, fuel: 'Gas', drive: 'FWD', trans: 'IVT automatic', engine: '2.0L 4-cylinder', mpg: '33 city / 43 hwy', ext: 'Intense Blue', hex: '#25489C', fam: 'Blue', int: 'Black cloth', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Just arrived', photos: 20, listed: 4, feats: ['cp', 'lane', 'cam', 'bsm', 'key'], desc: ['A great first car: low payments, over 40 mpg on the highway, and Hyundai\'s powertrain warranty still has years left on it.', 'It has wireless CarPlay and blind spot monitoring, which is rare at this price.'] },
    { id: 11, y: 2020, make: 'Chrysler', model: 'Pacifica', trim: 'Touring L', body: 'van', price: 22400, miles: 59300, fuel: 'Gas', drive: 'FWD', trans: '9-speed automatic', engine: '3.6L V6', mpg: '19 city / 28 hwy', ext: 'Bright White', hex: '#F3F3F1', fam: 'White', int: 'Black leather', seats: 7, doors: 4, loc: 'Ships nationwide', badge: 'Price drop', photos: 24, listed: 25, feats: ['third', 'slide', 'heat', 'cp', 'cam', 'lift'], desc: ['The second-row seats fold flat into the floor, so this van turns into a cargo hauler in under a minute. The leather is clean and the power doors run smoothly.', 'We reduced the price this week, which makes it one of the best-value family vans we have.'] },
    { id: 12, y: 2017, make: 'Mazda', model: 'MX-5 Miata', trim: 'Club', body: 'coupe', price: 19800, miles: 42100, fuel: 'Gas', drive: 'RWD', trans: '6-speed manual', engine: '2.0L 4-cylinder', mpg: '27 city / 34 hwy', ext: 'Soul Red', hex: '#9E1C24', fam: 'Red', int: 'Black cloth', seats: 2, doors: 2, loc: 'Omaha, NE', badge: 'Inspected', photos: 21, listed: 11, feats: ['manual', 'audio', 'key', 'top'], desc: ['The Club trim has the limited-slip differential, sport suspension and Bose audio. The clutch is smooth and the manual top folds down with one hand.', 'It comes with a stack of receipts from an enthusiast owner who changed the oil every 4,000 miles.'] },
    { id: 13, y: 2020, make: 'Mazda', model: 'CX-5', trim: 'Touring', body: 'suv', price: 21400, miles: 48600, fuel: 'Gas', drive: 'AWD', trans: '6-speed automatic', engine: '2.5L 4-cylinder', mpg: '24 city / 30 hwy', ext: 'Machine Gray', hex: '#6B6E74', fam: 'Gray', int: 'Black leatherette', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Inspected', photos: 21, listed: 8, feats: ['heat', 'cp', 'bsm', 'cam', 'push', 'lift'], desc: ['The CX-5 drives more like a sport sedan than an SUV, and the interior feels a class above its price. This Touring has heated leatherette seats and a power liftgate.', 'It has a clean history and one owner.'] },
    { id: 14, y: 2021, make: 'Ford', model: 'Explorer', trim: 'XLT', body: 'suv', price: 28750, miles: 44900, fuel: 'Gas', drive: '4WD', trans: '10-speed automatic', engine: '2.3L turbo 4-cylinder', mpg: '20 city / 27 hwy', ext: 'Atlas Blue', hex: '#2D4B6F', fam: 'Blue', int: 'Ebony cloth', seats: 7, doors: 4, loc: 'Ships nationwide', badge: 'Inspected', photos: 27, listed: 10, feats: ['third', 'cp', 'acc', 'lift', 'remote', 'cam'], desc: ['A seven-seat Explorer with the turbo four that is punchy and still decent on fuel. Remote start and adaptive cruise make road trips easy.', 'Ford factory warranty coverage remains on the powertrain.'] },
    { id: 15, y: 2019, make: 'Subaru', model: 'Outback', trim: '2.5i Premium', body: 'suv', price: 19900, miles: 62300, fuel: 'Gas', drive: 'AWD', trans: 'CVT automatic', engine: '2.5L flat-4', mpg: '25 city / 32 hwy', ext: 'Wilderness Green', hex: '#3E4B3D', fam: 'Green', int: 'Slate Black cloth', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Price drop', photos: 23, listed: 22, feats: ['heat', 'acc', 'cp', 'cam', 'lane'], desc: ['Symmetrical all-wheel drive and 8.7 inches of ground clearance make this Outback the car that always makes it home in the snow. The roof rails are ready for bikes or a cargo box.', 'Its timing chain engine needs no belt replacement.'] },
    { id: 16, y: 2020, make: 'Toyota', model: 'Highlander', trim: 'XLE', body: 'suv', price: 32800, miles: 51700, fuel: 'Gas', drive: 'AWD', trans: '8-speed automatic', engine: '3.5L V6', mpg: '20 city / 27 hwy', ext: 'Blizzard Pearl', hex: '#EEEEE9', fam: 'White', int: 'Graphite leather', seats: 8, doors: 4, loc: 'Ships nationwide', badge: 'Inspected', photos: 29, listed: 7, feats: ['third', 'heat', 'roof', 'cp', 'acc', 'lift'], desc: ['The redesigned Highlander with the smooth V6, a third row and Toyota Safety Sense. This XLE has the moonroof, heated leather and a 12-inch screen.', 'It was serviced at the same Toyota dealer since new.'] },
    { id: 17, y: 2020, make: 'Toyota', model: 'Tacoma', trim: 'TRD Off-Road', body: 'truck', price: 33900, miles: 46200, fuel: 'Gas', drive: '4WD', trans: '6-speed automatic', engine: '3.5L V6', mpg: '18 city / 22 hwy', ext: 'Cement', hex: '#8A8D8C', fam: 'Gray', int: 'Black cloth', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Just arrived', photos: 28, listed: 2, feats: ['awdx', 'tow', 'cp', 'cam', 'bed'], desc: ['The TRD Off-Road has the locking rear differential, crawl control and Bilstein shocks. It shows no off-road damage underneath, and we checked carefully.', 'Tacomas hold their value better than almost anything on the road.'] },
    { id: 18, y: 2021, make: 'Chevrolet', model: 'Silverado 1500', trim: 'LT Crew Cab', body: 'truck', price: 36400, miles: 39800, fuel: 'Gas', drive: '4WD', trans: '8-speed automatic', engine: '5.3L V8', mpg: '16 city / 20 hwy', ext: 'Northsky Blue', hex: '#2F4765', fam: 'Blue', int: 'Jet Black cloth', seats: 6, doors: 4, loc: 'Ships nationwide', badge: 'Inspected', photos: 30, listed: 14, feats: ['tow', 'remote', 'cp', 'cam', 'heat', 'push'], desc: ['A low-mile Silverado LT with the 5.3 V8, heated seats and the tow package. The bed is clean and the tailgate works the way it should.', 'Remaining Chevrolet powertrain coverage transfers to you.'] },
    { id: 19, y: 2020, make: 'Honda', model: 'Accord', trim: 'Sport', body: 'sedan', price: 22900, miles: 44300, fuel: 'Gas', drive: 'FWD', trans: 'CVT automatic', engine: '1.5L turbo 4-cylinder', mpg: '29 city / 35 hwy', ext: 'Still Night Pearl', hex: '#1E2A40', fam: 'Blue', int: 'Black cloth', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Inspected', photos: 23, listed: 13, feats: ['cp', 'acc', 'lane', 'cam', 'push', 'zone'], desc: ['The Accord Sport adds 19-inch wheels and a sharper look to the best midsize sedan of its generation. The back seat is roomy enough for adults.', 'Every scheduled service is on record.'] },
    { id: 20, y: 2019, make: 'Nissan', model: 'Altima', trim: '2.5 SV', body: 'sedan', price: 14600, miles: 68900, fuel: 'Gas', drive: 'FWD', trans: 'CVT automatic', engine: '2.5L 4-cylinder', mpg: '28 city / 39 hwy', ext: 'Gun Metallic', hex: '#55595F', fam: 'Gray', int: 'Charcoal cloth', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Price drop', photos: 20, listed: 30, feats: ['acc', 'cp', 'cam', 'push', 'remote'], desc: ['An affordable commuter with adaptive cruise and remote start, features you rarely see under $15,000. The CVT was serviced at 60,000 miles.', 'The tires are new, the brakes are good, and it is ready to go.'] },
    { id: 21, y: 2019, make: 'Chevrolet', model: 'Camaro', trim: '1LT', body: 'coupe', price: 21700, miles: 37900, fuel: 'Gas', drive: 'RWD', trans: '8-speed automatic', engine: '2.0L turbo 4-cylinder', mpg: '22 city / 31 hwy', ext: 'Summit White', hex: '#F1F1EF', fam: 'White', int: 'Jet Black cloth', seats: 4, doors: 2, loc: 'Omaha, NE', badge: 'Inspected', photos: 22, listed: 16, feats: ['cp', 'cam', 'remote', 'key'], desc: ['Sports car looks with a turbo four that is easy on fuel and insurance. It is a clean, unmodified example with one owner.', 'It makes a fun daily driver from spring to fall.'] },
    { id: 22, y: 2021, make: 'Toyota', model: 'Sienna', trim: 'XLE', body: 'van', price: 38200, miles: 31600, fuel: 'Hybrid', drive: 'AWD', trans: 'eCVT automatic', engine: '2.5L 4-cylinder hybrid', mpg: '35 city / 36 hwy', ext: 'Celestial Silver', hex: '#B8BDC3', fam: 'Silver', int: 'Gray leather', seats: 8, doors: 4, loc: 'Ships nationwide', badge: 'Just arrived', photos: 30, listed: 3, feats: ['third', 'slide', 'heat', 'cp', 'acc', 'roof'], desc: ['Every new Sienna is a hybrid, and this XLE also has all-wheel drive. A minivan that gets 35 mpg is still a small miracle.', 'It is one owner with Toyota hybrid warranty remaining.'] },
    { id: 23, y: 2021, make: 'Chevrolet', model: 'Bolt EV', trim: 'LT', body: 'electric', shape: 'hatch', price: 16900, miles: 28700, fuel: 'Electric', drive: 'FWD', trans: 'Single-speed', engine: 'Electric motor, 200 hp', mpg: '127 city / 108 hwy MPGe', ext: 'Cayenne Orange', hex: '#C25A2C', fam: 'Orange', int: 'Dark Ash cloth', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Inspected', photos: 20, listed: 9, feats: ['cp', 'cam', 'key', 'heat'], desc: ['This Bolt had its battery pack replaced under the GM recall, so it is effectively a new battery with a fresh 8-year warranty. Expect about 259 miles of range.', 'It may also qualify for the federal used EV tax credit. Ask us how.'] },
    { id: 24, y: 2020, make: 'Kia', model: 'Niro', trim: 'LX Hybrid', body: 'electric', shape: 'hatch', price: 13900, miles: 71200, fuel: 'Hybrid', drive: 'FWD', trans: '6-speed dual-clutch', engine: '1.6L 4-cylinder hybrid', mpg: '52 city / 49 hwy', ext: 'Snow White Pearl', hex: '#F0F0ED', fam: 'White', int: 'Charcoal cloth', seats: 5, doors: 4, loc: 'Omaha, NE', badge: 'Inspected', photos: 19, listed: 19, feats: ['cp', 'cam', 'key', 'lane'], desc: ['Over 50 mpg in a practical hatchback with a big cargo area. This Niro is our most fuel-efficient car under $15,000.', 'The hybrid system is covered by Kia\'s 10-year hybrid component warranty.'] }
  ];
  var BYID = {}; V.forEach(function (v) { BYID[v.id] = v; });
  var FAM = { White: '#F2F2EE', Black: '#1F2228', Silver: '#B8BDC3', Gray: '#6B6E74', Blue: '#2B4C7E', Red: '#B3131C', Green: '#3E4B3D', Orange: '#C25A2C' };

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
  function num(n) { return Math.round(n).toLocaleString('en-US'); }
  function title(v) { return v.y + ' ' + v.make + ' ' + v.model; }
  function full(v) { return title(v) + ' ' + v.trim; }
  function pay(principal, apr, term) { var r = apr / 100 / 12; return principal <= 0 ? 0 : principal * r / (1 - Math.pow(1 + r, -term)); }
  function monthly(v) { return pay(v.price * 0.9, 7.9, 60); }
  function stock(v) { return 'RW' + (1040 + v.id * 7); }
  function vin(v) {
    var pre = { Honda: '2HKRW2H5', Ford: '1FTEW1EP', Toyota: '4T1G11AK', Chevrolet: '1GNSKBKC', Tesla: '5YJ3E1EB', Mazda: 'JM1NDAD7', Hyundai: '5NPLN4AG', Chrysler: '2C4RC1BG', Ram: '1C6SRFFT', Subaru: '4S4BSANC', Nissan: '1N4BL4DV', Kia: 'KNDCB3LC' }[v.make] || '1RWMT000';
    var yc = { 2017: 'H', 2018: 'J', 2019: 'K', 2020: 'L', 2021: 'M', 2022: 'N' }[v.y];
    return pre + (v.id % 9) + yc + 'H' + String(600000 + v.id * 12347).slice(0, 6);
  }
  function badgeCls(b) { return { 'Inspected': 'b-ok', 'Just arrived': 'b-info', 'Price drop': 'b-accent' }[b] || 'b-neutral'; }
  function shapeOf(v) { return v.shape || { suv: 'suv', truck: 'truck', sedan: 'sedan', coupe: 'coupe', van: 'van', electric: 'hatch' }[v.body]; }
  function intColor(v) { return /Black|Ebony|Charcoal|Jet/.test(v.int) ? '#2B2F38' : (/Gray|Graphite|Slate|Ash/.test(v.int) ? '#6E7480' : '#A8916F'); }

  /* ---------- car illustration ---------- */
  var SHAPES = {
    sedan: { d: 'M14 70 Q12 58 24 55 L62 50 L88 32 Q94 28 104 28 L150 28 Q160 28 168 34 L190 50 L216 54 Q228 56 228 66 L228 72 Q228 76 222 76 L20 76 Q14 76 14 70 Z', win: ['M70 51 L92 34 Q96 31 104 31 L126 31 L126 50 Z', 'M131 31 L150 31 Q158 31 164 36 L184 50 L131 50 Z'], door: [128, 172], w: [62, 184], r: 15 },
    fastback: { d: 'M14 70 Q12 58 24 55 L60 51 L92 32 Q100 27 112 27 L146 27 Q160 28 176 40 L204 54 L218 56 Q228 58 228 66 L228 72 Q228 76 222 76 L20 76 Q14 76 14 70 Z', win: ['M72 51 L96 35 Q102 30 112 30 L128 30 L128 51 Z', 'M132 30 L144 30 Q156 31 168 40 L182 51 L132 51 Z'], door: [130, 180], w: [62, 184], r: 15 },
    suv: { d: 'M14 70 Q12 54 24 52 L48 50 L62 24 Q66 18 78 18 L170 18 Q182 18 190 28 L206 48 L218 50 Q228 52 228 62 L228 72 Q228 76 222 76 L20 76 Q14 76 14 70 Z', win: ['M54 48 L66 25 Q69 21 78 21 L112 21 L112 47 Z', 'M117 21 L150 21 L150 47 L117 47 Z', 'M155 21 L170 21 Q179 21 185 29 L198 47 L155 47 Z'], door: [114, 152], w: [60, 186], r: 16 },
    truck: { d: 'M12 72 L12 50 Q12 46 16 46 L106 46 L110 26 Q112 20 120 20 L160 20 Q168 20 174 28 L188 46 L218 50 Q230 52 230 62 L230 72 Q230 76 224 76 L18 76 Q12 76 12 72 Z', win: ['M116 44 L118 27 Q119 24 124 24 L142 24 L142 44 Z', 'M147 24 L159 24 Q165 24 169 30 L180 44 L147 44 Z'], door: [144, 184], bed: true, w: [50, 192], r: 17 },
    coupe: { d: 'M12 70 Q10 60 22 57 L66 52 L98 36 Q106 32 118 32 L144 32 Q158 33 170 41 L196 54 L220 57 Q230 59 230 67 L230 72 Q230 76 224 76 L18 76 Q12 76 12 70 Z', win: ['M80 52 L102 39 Q109 35 118 35 L126 35 L126 52 Z', 'M130 35 L142 35 Q154 36 164 43 L178 52 L130 52 Z'], door: [176], w: [60, 188], r: 15 },
    van: { d: 'M14 70 Q12 58 20 54 L28 52 L30 24 Q31 16 42 16 L170 16 Q182 16 190 26 L208 50 L220 53 Q228 56 228 64 L228 72 Q228 76 222 76 L20 76 Q14 76 14 70 Z', win: ['M36 46 L37 26 Q38 20 46 20 L80 20 L80 46 Z', 'M85 20 L128 20 L128 46 L85 46 Z', 'M133 20 L168 20 Q177 20 183 28 L196 46 L133 46 Z'], door: [130, 194], w: [56, 188], r: 16 },
    hatch: { d: 'M14 70 Q12 56 22 53 L40 50 L56 26 Q60 20 70 20 L150 20 Q162 21 176 34 L196 50 L216 53 Q228 55 228 64 L228 72 Q228 76 222 76 L20 76 Q14 76 14 70 Z', win: ['M46 48 L60 27 Q63 23 70 23 L108 23 L108 47 Z', 'M113 23 L148 23 Q158 24 170 35 L182 47 L113 47 Z'], door: [110, 182], w: [58, 186], r: 15 }
  };
  function car(v, cls, style) {
    var s = SHAPES[shapeOf(v)], c = v.hex, out = [];
    out.push('<svg class="car ' + (cls || '') + '" viewBox="0 0 240 100" role="img" aria-label="' + esc(v.ext + ' ' + title(v)) + '"' + (style ? ' style="' + style + '"' : '') + '>');
    out.push('<ellipse cx="120" cy="91" rx="106" ry="6" fill="rgba(0,0,0,0.18)"/>');
    out.push('<path d="' + s.d + '" fill="' + c + '" stroke="rgba(10,15,30,0.32)" stroke-width="1.2" stroke-linejoin="round"/>');
    out.push('<path d="M20 64 H222" stroke="rgba(255,255,255,0.22)" stroke-width="1.4"/>');
    s.win.forEach(function (w) { out.push('<path d="' + w + '" fill="#263247" stroke="rgba(0,0,0,0.25)" stroke-width="0.8"/>'); });
    (s.door || []).forEach(function (x) { out.push('<path d="M' + x + ' 50 V72" stroke="rgba(10,15,30,0.28)" stroke-width="1"/>'); });
    if (s.bed) out.push('<path d="M16 52 H104" stroke="rgba(10,15,30,0.3)" stroke-width="1.2"/>');
    out.push('<rect x="219" y="57" width="9" height="4" rx="2" fill="#FFF3CC"/><rect x="12" y="56" width="6" height="5" rx="1.5" fill="#C8252D"/>');
    s.w.forEach(function (x) {
      out.push('<circle cx="' + x + '" cy="76" r="' + (s.r + 3) + '" fill="rgba(10,14,24,0.45)"/>');
      out.push('<circle cx="' + x + '" cy="76" r="' + s.r + '" fill="#171C27"/>');
      out.push('<circle cx="' + x + '" cy="76" r="' + (s.r * 0.56).toFixed(1) + '" fill="#C9D0DA"/>');
      out.push('<circle cx="' + x + '" cy="76" r="' + (s.r * 0.2).toFixed(1) + '" fill="#6E7787"/>');
    });
    out.push('</svg>');
    return out.join('');
  }
  function interior(kind, v) {
    var ic = intColor(v);
    if (kind === 'dash') return '<svg class="car" viewBox="0 0 240 150" aria-hidden="true"><path d="M0 0 H240 V44 Q120 22 0 44 Z" fill="rgba(170,200,230,0.18)"/><path d="M0 88 Q120 58 240 88 L240 150 L0 150 Z" fill="#2C3342"/><rect x="104" y="66" width="46" height="28" rx="4" fill="#3A6FB8" opacity="0.9"/><rect x="108" y="70" width="18" height="8" rx="2" fill="#9CC2F0" opacity="0.6"/><rect x="164" y="80" width="22" height="6" rx="3" fill="#1A1F29"/><circle cx="66" cy="108" r="30" fill="none" stroke="#11151E" stroke-width="7"/><circle cx="66" cy="108" r="9" fill="#11151E"/><path d="M38 110 H94 M66 108 V136" stroke="#11151E" stroke-width="5"/></svg>';
    if (kind === 'seats') return '<svg class="car" viewBox="0 0 240 150" aria-hidden="true"><rect x="0" y="118" width="240" height="32" fill="#1A1F29"/><g fill="' + ic + '" stroke="rgba(0,0,0,0.35)" stroke-width="1.2"><rect x="38" y="22" width="64" height="86" rx="18"/><rect x="30" y="96" width="80" height="34" rx="12"/><rect x="50" y="6" width="40" height="22" rx="9"/><rect x="138" y="22" width="64" height="86" rx="18"/><rect x="130" y="96" width="80" height="34" rx="12"/><rect x="150" y="6" width="40" height="22" rx="9"/></g><rect x="112" y="92" width="16" height="40" rx="5" fill="#2C3342"/></svg>';
    if (kind === 'cargo') return '<svg class="car" viewBox="0 0 240 150" aria-hidden="true"><path d="M30 20 H210 L226 140 H14 Z" fill="#232937"/><path d="M48 34 H192 L204 124 H36 Z" fill="#2E3545"/><path d="M48 34 H192 L188 62 H52 Z" fill="' + ic + '" opacity="0.9"/><rect x="104" y="128" width="32" height="6" rx="3" fill="#C9D0DA"/><circle cx="56" cy="44" r="3" fill="#FFF3CC"/><circle cx="184" cy="44" r="3" fill="#FFF3CC"/></svg>';
    return '<svg class="car" viewBox="0 0 240 150" aria-hidden="true"><rect x="10" y="10" width="220" height="130" rx="10" fill="#1E232D"/><rect x="62" y="40" width="116" height="62" rx="8" fill="#3B4252"/><g fill="#555E70"><circle cx="86" cy="58" r="8"/><circle cx="110" cy="58" r="8"/><circle cx="134" cy="58" r="8"/><circle cx="158" cy="58" r="8"/></g><rect x="78" y="76" width="84" height="16" rx="4" fill="#C25A2C" opacity="0.85"/><path d="M30 40 Q20 80 44 112 M210 40 Q220 80 196 112" stroke="#11151E" stroke-width="6" fill="none"/><rect x="184" y="22" width="26" height="16" rx="3" fill="#2B5FA8"/></svg>';
  }
  var VIEWS = [
    { k: 'side', t: 'Driver side' }, { k: 'flip', t: 'Passenger side' }, { k: 'dash', t: 'Dashboard and screen' }, { k: 'wheel', t: 'Front wheel and tire' },
    { k: 'seats', t: 'Front seats' }, { k: 'front', t: 'Front three-quarter' }, { k: 'cargo', t: 'Cargo area' }, { k: 'engine', t: 'Engine bay' }
  ];
  function frameHTML(v, i) {
    var view = VIEWS[i % VIEWS.length], tone = 'tone-' + v.body, inner;
    var spin = Math.floor(i / VIEWS.length);
    if (view.k === 'side') inner = car(v, '', spin ? 'transform: scale(1.08)' : '');
    else if (view.k === 'flip') inner = car(v, '', 'transform: scaleX(-1)' + (spin ? ' scale(1.08)' : ''));
    else if (view.k === 'wheel') inner = car(v, '', 'transform: scale(2.5) translate(-26%, -10%)');
    else if (view.k === 'front') inner = car(v, '', 'transform: scale(1.5) translate(-12%, 0)');
    else { inner = interior(view.k, v); tone = 'tone-int'; }
    return { html: '<div class="frame ' + tone + '">' + inner + '</div>', label: view.t, tone: tone };
  }

  /* ---------- saved / recent ---------- */
  function saved() { return storeGet('saved', []); }
  function isSaved(id) { return saved().indexOf(id) > -1; }
  function toggleSave(id) {
    var s = saved(), i = s.indexOf(id), on = i === -1;
    if (on) s.unshift(id); else s.splice(i, 1);
    storeSet('saved', s);
    $$('[data-save="' + id + '"]').forEach(function (b) {
      b.setAttribute('aria-pressed', on);
      b.setAttribute('aria-label', (on ? 'Remove ' : 'Save ') + title(BYID[id]) + (on ? ' from saved' : ''));
      var t = b.querySelector('[data-save-text]'); if (t) t.textContent = on ? 'Saved' : 'Save';
    });
    updateSavedCount();
    toast(on ? 'Saved to your list' : 'Removed from saved', on ? 'heart' : null);
    document.dispatchEvent(new CustomEvent('rw:saved'));
  }
  function updateSavedCount() {
    var n = saved().length;
    $$('.saved-count').forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
  }
  function pushRecent(id) { var r = storeGet('recent', []).filter(function (x) { return x !== id; }); r.unshift(id); storeSet('recent', r.slice(0, 8)); }

  /* ---------- toast ---------- */
  function toast(msg, ic) {
    var box = $('.toasts');
    if (!box) { box = document.createElement('div'); box.className = 'toasts'; box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
    var t = document.createElement('div'); t.className = 'toast';
    t.innerHTML = (ic ? icon(ic, 18) : icon('check', 18)) + '<span>' + esc(msg) + '</span>';
    box.appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 260); }, 2600);
  }
  function copyText(text, msg) {
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast(msg); } catch (e) { toast('Press Ctrl+C to copy'); }
      ta.remove();
    }
    try { navigator.clipboard.writeText(text).then(function () { toast(msg); }, fallback); } catch (e) { fallback(); }
  }

  /* ---------- vehicle card ---------- */
  function vcard(v) {
    var on = isSaved(v.id);
    return '<article class="vcard">' +
      '<a href="vehicle.html#v' + v.id + '">' +
        '<div class="photo tone-' + v.body + '"><span class="badge vcard-badge ' + badgeCls(v.badge) + '">' + v.badge + '</span>' + car(v) +
        '<span class="vcard-count">' + icon('camera', 14) + ' ' + v.photos + ' photos</span></div>' +
        '<div class="vcard-body"><div class="vcard-title">' + title(v) + '</div><div class="vcard-trim">' + esc(v.trim) + ' · ' + esc(v.engine) + '</div>' +
        '<div class="vcard-price"><span class="price">' + money(v.price) + '</span><span class="muted small num">Est. ' + money(monthly(v)) + '/mo*</span></div>' +
        '<div class="vcard-specs"><span>' + num(v.miles) + ' mi</span><span>' + v.fuel + '</span><span>' + v.drive + '</span></div>' +
        '<div class="vcard-loc">' + icon(v.loc === 'Ships nationwide' ? 'truck' : 'pin', 16) + ' ' + v.loc + '</div></div>' +
      '</a>' +
      '<button type="button" class="heart" data-save="' + v.id + '" aria-pressed="' + on + '" aria-label="' + (on ? 'Remove ' : 'Save ') + esc(title(v)) + (on ? ' from saved' : '') + '">' + icon('heart', 20) + '</button>' +
    '</article>';
  }
  var EST_NOTE = '*Estimated payment based on 10% down, 60 months at an example 7.9% APR. Your rate depends on credit approval.';

  /* ---------- header, footer, mobile bar ---------- */
  var NAV = [['inventory', 'Inventory', 'inventory.html'], ['sell', 'Sell or trade', 'sell.html'], ['financing', 'Financing', 'financing.html'], ['delivery', 'Delivery', 'delivery.html'], ['about', 'About', 'about.html'], ['contact', 'Contact', 'contact.html']];
  function renderHeader() {
    var page = document.body.dataset.page, host = $('#site-header');
    if (!host) return;
    var ann = '';
    if (document.body.hasAttribute('data-announce') && !storeGet('annDismissed', false)) {
      ann = '<div class="announce" id="announce"><div class="wrap"><span>Free delivery within 250 miles on select vehicles this month.</span> <a href="inventory.html#delivery-deals">See which cars</a><button type="button" aria-label="Dismiss announcement" id="ann-close">' + icon('close', 18) + '</button></div></div>';
    }
    var links = NAV.map(function (n) { return '<a href="' + n[2] + '"' + (n[0] === page ? ' aria-current="page"' : '') + '>' + n[1] + '</a>'; }).join('');
    host.innerHTML = '<a class="skip" href="#main">Skip to content</a>' + ann +
      '<header class="hdr"><div class="wrap">' +
        '<a class="logo" href="index.html" aria-label="Redwater Motors home">' + LOGO + '<span class="logo-word">Redwater Motors</span></a>' +
        '<nav class="nav" aria-label="Primary">' + links + '</nav>' +
        '<div class="hdr-actions">' +
          '<a class="hdr-phone" href="tel:' + PHONE_TEL + '" aria-label="Call ' + PHONE + '">' + icon('phone', 18) + '<span>' + PHONE + '</span></a>' +
          '<a class="btn btn-icon saved-link" href="inventory.html#saved" aria-label="Saved vehicles">' + icon('heart', 20) + '<span class="saved-count" hidden>0</span></a>' +
          '<a class="btn btn-primary btn-sm hdr-cta" href="inventory.html">Browse inventory</a>' +
          '<button type="button" class="btn btn-icon menu-btn" aria-label="Open menu" aria-expanded="false" id="menu-open">' + icon('menu', 22) + '</button>' +
        '</div></div></header>';
    updateSavedCount();
    var ac = $('#ann-close');
    if (ac) ac.addEventListener('click', function () { storeSet('annDismissed', true); $('#announce').remove(); });
    $('#menu-open').addEventListener('click', openMenu);
  }
  function openMenu() {
    var page = document.body.dataset.page, btn = $('#menu-open');
    var m = document.createElement('div');
    m.className = 'mmenu'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', 'Menu');
    m.innerHTML = '<div class="mmenu-top"><a class="logo" href="index.html">' + LOGO + '<span class="logo-word">Redwater Motors</span></a><button type="button" class="btn btn-icon btn-secondary" aria-label="Close menu">' + icon('close', 22) + '</button></div>' +
      '<nav aria-label="Mobile">' + [['home', 'Home', 'index.html']].concat(NAV).concat([['resources', 'FAQ and guides', 'resources.html']]).map(function (n) {
        return '<a href="' + n[2] + '"' + (n[0] === page ? ' aria-current="page"' : '') + '>' + n[1] + icon('right', 22) + '</a>';
      }).join('') + '</nav>' +
      '<div class="mmenu-foot"><a class="btn btn-primary btn-lg" href="tel:' + PHONE_TEL + '">' + icon('phone', 20) + ' Call ' + PHONE + '</a><a class="btn btn-secondary btn-lg" href="inventory.html">Browse inventory</a><p class="muted small" style="text-align:center">Mon to Sat 9 AM to 6 PM · Sun 11 AM to 4 PM</p></div>';
    document.body.appendChild(m);
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
    void m.offsetWidth;
    requestAnimationFrame(function () { m.classList.add('is-open'); });
    var closeBtn = m.querySelector('.mmenu-top button');
    closeBtn.focus();
    function close() {
      m.classList.remove('is-open'); document.body.style.overflow = ''; btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { m.remove(); btn.focus(); }, 200);
    }
    function onKey(e) { if (e.key === 'Escape') close(); trapFocus(e, m); }
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
  }
  function trapFocus(e, root) {
    if (e.key !== 'Tab') return;
    var f = $$('a[href], button:not([disabled]), input, select, textarea', root).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
  function renderFooter() {
    var host = $('#site-footer'); if (!host) return;
    var TALK = {
      home: ['A specific vehicle', 'Which car caught your eye, or what are you looking for?'],
      inventory: ['Find a car for me', "Tell us the make, budget and must-haves, and we'll search for you."],
      sell: ['Selling or trading in', 'Year, make, model and mileage of the car you want to sell.'],
      financing: ['Financing', 'Your budget and any questions about credit or terms.'],
      delivery: ['Delivery', 'Which car, and where should we deliver it?'],
      about: ['Test drive or visit', 'When would you like to stop by?'],
      resources: ['Something else', 'Ask us anything. A real person will answer.']
    };
    var tk = TALK[document.body.dataset.page] || ['Something else', 'How can we help?'];
    var topics = ['A specific vehicle', 'Find a car for me', 'Financing', 'Selling or trading in', 'Delivery', 'Test drive or visit', 'Something else'];
    var cta = document.body.hasAttribute('data-no-cta') ? '' :
      '<section class="cta-wrap" id="talk" aria-labelledby="cta-title"><div class="wrap"><div class="talk">' +
        '<div class="talk-copy"><span class="eyebrow">Talk to a person</span><h2 id="cta-title" class="h2">Ready to talk?</h2>' +
          '<p class="lead">Send a quick message right here, or call. We reply within one business day, usually within the hour.</p>' +
          '<ul class="talk-points"><li><span class="icon-box">' + icon('phone', 20) + '</span><span><small>Call</small><a href="tel:' + PHONE_TEL + '">' + PHONE + '</a></span></li>' +
          '<li><span class="icon-box">' + icon('message', 20) + '</span><span><small>Text</small><a href="sms:' + TEXT_TEL + '">' + TEXTNUM + '</a></span></li>' +
          '<li><span class="icon-box">' + icon('clock', 20) + '</span><span><small>Hours</small><strong class="num" style="font-weight:600">Mon to Sat 9 AM to 6 PM, Sun 11 AM to 4 PM</strong></span></li></ul></div>' +
        '<div class="talk-card"><form id="talk-form" data-fake="talk-ok" aria-labelledby="cta-title"><div class="form-grid">' +
          '<label class="field"><span>Name</span><input class="input" id="t-name" name="name" autocomplete="name" required></label>' +
          '<label class="field"><span>Mobile phone</span><input class="input" id="t-phone" type="tel" autocomplete="tel" placeholder="(555) 555-5555" required></label>' +
          '<label class="field span-all"><span>Topic</span><select class="input" id="t-topic">' + topics.map(function (t) { return '<option' + (t === tk[0] ? ' selected' : '') + '>' + t + '</option>'; }).join('') + '</select></label>' +
          '<label class="field span-all"><span>Message</span><textarea class="input" id="t-msg" rows="3" placeholder="' + esc(tk[1]) + '" required></textarea></label>' +
          '<label class="check span-all"><input type="checkbox" id="t-consent" required><span>I agree to be contacted by phone, text or email about my message. See our <a href="privacy.html">privacy policy</a>.</span></label>' +
          '<div class="span-all"><button class="btn btn-primary btn-lg btn-block" type="submit">' + icon('message', 20) + ' Send message</button></div>' +
        '</div></form>' +
        '<div id="talk-ok" class="success" hidden><span class="success-icon">' + icon('check', 28) + '</span><h3 class="h3">Thanks<span data-echo="name"></span>, we got your message</h3><p class="muted">Someone from our team will reply within one business day. If it\'s urgent, call <strong class="num" style="color:var(--ink)">' + PHONE + '</strong>.</p><button type="button" class="btn btn-secondary" data-reset="talk-form">Send another message</button></div>' +
        '</div></div></div></section>';
    var shop = NAV.map(function (n) { return '<a href="' + n[2] + '">' + n[1] + '</a>'; }).join('');
    var res = [['Financing application', 'financing.html#apply'], ['Delivery', 'delivery.html'], ['FAQ and guides', 'resources.html'], ['Warranty and inspection', 'resources.html#warranty'], ['Privacy policy', 'privacy.html'], ['Terms of service', 'terms.html']].map(function (r) { return '<a href="' + r[1] + '">' + r[0] + '</a>'; }).join('');
    host.innerHTML = cta +
      '<footer class="ftr"><div class="wrap"><div class="ftr-grid">' +
        '<div class="stack" style="gap:16px"><a class="logo" href="index.html">' + LOGO.replace('#1C1C1C', '#2B2B2B') + '<span class="logo-word">Redwater Motors</span></a>' +
          '<p class="small" style="color:var(--footer-muted);max-width:320px;line-height:1.6">Every car is inspected before it is listed, and every price includes our fees. No pressure, just straight answers.</p>' +
          '<div class="ftr-alerts"><label for="ftr-email">New arrival alerts</label><form id="ftr-form" novalidate><input id="ftr-email" class="input" type="email" placeholder="Email address" autocomplete="email" required><button class="btn btn-light btn-sm" type="submit">Sign up</button></form></div></div>' +
        '<nav aria-label="Footer"><h3>Shop</h3>' + shop + '</nav>' +
        '<nav aria-label="Buyer resources"><h3>Buyer resources</h3>' + res + '</nav>' +
        '<div class="ftr-contact"><h3>Visit or call</h3><span>1820 Leavenworth St<br>Omaha, NE 68104</span><span class="num">Mon to Sat, 9 AM to 6 PM<br>Sun, 11 AM to 4 PM</span><a href="tel:' + PHONE_TEL + '"><strong class="num">' + PHONE + '</strong></a><a href="mailto:' + EMAIL + '" style="overflow-wrap:anywhere">' + EMAIL + '</a>' +
          '<span style="display:flex;gap:16px;flex-wrap:wrap"><a href="https://www.facebook.com" rel="noopener">Facebook</a><a href="https://www.instagram.com" rel="noopener">Instagram</a><a href="https://www.youtube.com" rel="noopener">YouTube</a></span></div>' +
      '</div><div class="ftr-bottom"><span>© 2026 Redwater Motors. A fictive dealership created for design purposes.</span><button type="button" class="theme-btn" id="theme-btn"></button></div></div></footer>';
    $('#ftr-form').addEventListener('submit', function (e) {
      e.preventDefault(); var i = $('#ftr-email');
      if (!/^\S+@\S+\.\S+$/.test(i.value)) { toast('Enter an email like name@example.com', 'info'); i.focus(); return; }
      i.value = ''; toast("You're on the list for new arrivals");
    });
    var tb = $('#theme-btn');
    function isDark() { var t = document.documentElement.getAttribute('data-theme'); return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; }
    function label() { tb.innerHTML = icon(isDark() ? 'sun' : 'moon', 16) + (isDark() ? 'Light mode' : 'Dark mode'); }
    label();
    tb.addEventListener('click', function () { var t = isDark() ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', t); storeSet('theme', t); label(); });
  }
  function renderMobileBar() {
    if (document.body.hasAttribute('data-no-mbar')) return;
    var bar = document.createElement('nav');
    bar.className = 'mbar'; bar.setAttribute('aria-label', 'Quick contact');
    if (document.body.dataset.page === 'vehicle') {
      bar.classList.add('mbar-vehicle');
      bar.innerHTML = '<button type="button" class="btn btn-primary" data-scroll="inquiry">Check availability</button><a class="btn btn-secondary" href="tel:' + PHONE_TEL + '" aria-label="Call now">' + icon('phone', 20) + '</a><a class="btn btn-secondary" href="sms:' + TEXT_TEL + '" aria-label="Text us">' + icon('message', 20) + '</a>';
    } else {
      bar.innerHTML = '<a class="btn btn-primary" href="tel:' + PHONE_TEL + '">' + icon('phone', 18) + ' Call</a><a class="btn btn-secondary" href="sms:' + TEXT_TEL + '">' + icon('message', 18) + ' Text</a>' + (document.getElementById('talk') ? '<button type="button" class="btn btn-secondary" data-scroll="talk">Inquire</button>' : '<a class="btn btn-secondary" href="contact.html">Inquire</a>');
    }
    document.body.appendChild(bar);
    document.body.classList.add('has-mbar');
  }
  function cookieNotice() {
    if (storeGet('cookie', false)) return;
    var c = document.createElement('div');
    c.className = 'cookie'; c.setAttribute('role', 'region'); c.setAttribute('aria-label', 'Cookie notice');
    c.innerHTML = '<p>We use a few cookies to remember your saved cars and to understand which pages help. <a href="privacy.html">Privacy policy</a></p><div><button type="button" class="btn btn-primary btn-sm" data-c="all">Accept</button><button type="button" class="btn btn-secondary btn-sm" data-c="min">Only necessary</button></div>';
    document.body.appendChild(c);
    c.addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (!b) return; storeSet('cookie', b.dataset.c); c.remove(); });
  }

  /* ---------- forms: validation, phone format, fake submit ---------- */
  function fieldWrap(el) { return el.closest('.field') || el.closest('.check'); }
  function setError(el, msg) {
    var w = fieldWrap(el); if (!w) return;
    w.classList.toggle('invalid', !!msg);
    var e = w.querySelector('.field-error');
    if (!e && w.classList.contains('field')) { e = document.createElement('small'); e.className = 'field-error'; w.appendChild(e); }
    if (e) e.textContent = msg || '';
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  function checkField(el) {
    if (el.closest('[hidden]') || el.disabled) return '';
    var v = (el.type === 'checkbox') ? el.checked : el.value.trim();
    if (el.required && !v) return el.dataset.error || (el.type === 'checkbox' ? 'Please confirm to continue.' : 'Please fill this in.');
    if (!v) return '';
    if (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) return 'Enter an email like name@example.com.';
    if (el.type === 'tel' && v.replace(/\D/g, '').length !== 10) return 'Enter a 10-digit phone number.';
    if (el.dataset.zip !== undefined && !/^\d{5}$/.test(v)) return 'Enter a 5-digit ZIP code.';
    if (el.dataset.vin !== undefined && !/^[A-HJ-NPR-Z0-9]{17}$/i.test(v)) return 'A VIN has 17 letters and numbers, without I, O or Q.';
    return '';
  }
  function validate(root) {
    var first = null;
    $$('input, select, textarea', root).forEach(function (el) {
      if (el.type === 'file' || el.type === 'range' || el.type === 'search') return;
      var msg = checkField(el); setError(el, msg);
      if (msg && !first) first = el;
    });
    if (first) { var tgt = first._selBtn || first; tgt.focus({ preventScroll: true }); tgt.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    return !first;
  }
  function bindForms(root) {
    $$('input[type="tel"]', root).forEach(function (el) {
      el.addEventListener('input', function () {
        var d = el.value.replace(/\D/g, '').slice(0, 10), o = d;
        if (d.length > 6) o = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
        else if (d.length > 3) o = '(' + d.slice(0, 3) + ') ' + d.slice(3);
        else if (d.length) o = '(' + d;
        el.value = o;
      });
    });
    $$('input, select, textarea', root).forEach(function (el) {
      el.addEventListener('blur', function () { var w = fieldWrap(el); if (w && w.classList.contains('invalid')) setError(el, checkField(el)); });
      el.addEventListener('input', function () { var w = fieldWrap(el); if (w && w.classList.contains('invalid')) setError(el, checkField(el)); });
      el.addEventListener('change', function () { if (el.type === 'checkbox') { var w = fieldWrap(el); if (w && w.classList.contains('invalid')) setError(el, checkField(el)); } });
    });
    $$('form[data-fake]', root).forEach(function (form) {
      form.setAttribute('novalidate', '');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(form)) return;
        var btn = form.querySelector('[type="submit"]');
        if (btn) btn.classList.add('is-loading');
        setTimeout(function () {
          if (btn) btn.classList.remove('is-loading');
          var ok = document.getElementById(form.dataset.fake);
          var name = form.querySelector('[name="name"], [name="first"]');
          if (ok) {
            $$('[data-echo="name"]', ok).forEach(function (s) { s.textContent = name && name.value.trim() ? ', ' + name.value.trim().split(' ')[0] : ''; });
            if (form.dataset.onsuccess && HOOKS[form.dataset.onsuccess]) HOOKS[form.dataset.onsuccess](form, ok);
            form.hidden = true; ok.hidden = false;
            var h = ok.querySelector('h2, h3'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
            ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 900);
      });
    });
    $$('[data-reset]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var form = document.getElementById(b.dataset.reset);
        b.closest('.success').hidden = true; form.reset(); form.hidden = false;
        $$('[data-stepper]', form.parentNode).forEach(function (s) { if (s._go) s._go(1); });
        var f = form.querySelector('input, select, textarea'); if (f) f.focus();
      });
    });
    // choice groups (segmented, chips, cards)
    $$('[data-choices]', root).forEach(function (g) {
      var btns = $$('[data-choose]', g), name = g.dataset.choices;
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          $$('[data-choice-for^="' + name + ':"]').forEach(function (p) { p.hidden = p.dataset.choiceFor !== name + ':' + b.dataset.choose; });
          var hint = document.querySelector('[data-hint-for="' + name + '"]'); if (hint && b.dataset.hint) hint.textContent = b.dataset.hint;
          var hidden = g.querySelector('input[type="hidden"]'); if (hidden) hidden.value = b.dataset.choose;
        });
      });
    });
    // file drop
    $$('.drop', root).forEach(function (d) {
      var input = d.querySelector('input[type="file"]'), out = d.querySelector('[data-file-name]');
      function show(f) { if (f && out) { out.textContent = f.name + ' · ' + Math.max(1, Math.round(f.size / 1024)) + ' KB'; d.classList.add('has-file'); } }
      input.addEventListener('change', function () { show(input.files[0]); });
      ['dragenter', 'dragover'].forEach(function (ev) { d.addEventListener(ev, function (e) { e.preventDefault(); d.classList.add('is-over'); }); });
      ['dragleave', 'drop'].forEach(function (ev) { d.addEventListener(ev, function (e) { e.preventDefault(); d.classList.remove('is-over'); }); });
      d.addEventListener('drop', function (e) { if (e.dataTransfer.files[0]) show(e.dataTransfer.files[0]); });
    });
    // steppers
    $$('form[data-stepper]', root).forEach(function (form) {
      form.setAttribute('novalidate', '');
      var panes = $$('[data-step]', form), n = panes.length, cur = 1;
      var next = form.querySelector('[data-next]'), back = form.querySelector('[data-back]');
      function go(i) {
        cur = i;
        panes.forEach(function (p) { p.hidden = Number(p.dataset.step) !== i; });
        var bar = form.querySelector('[data-progress]'); if (bar) bar.style.width = (i / n * 100) + '%';
        $$('[data-step-label]', form).forEach(function (l) { var k = Number(l.dataset.stepLabel); l.classList.toggle('on', k <= i); l.classList.toggle('current', k === i); });
        $$('[data-step-num]', form).forEach(function (s) { s.textContent = i; });
        var pb = form.querySelector('[role="progressbar"]'); if (pb) pb.setAttribute('aria-valuenow', i);
        back.hidden = i === 1;
        next.textContent = i === n ? next.dataset.final : 'Continue';
      }
      form._go = go;
      next.addEventListener('click', function () {
        var pane = panes[cur - 1];
        if (!validate(pane)) return;
        if (cur < n) {
          go(cur + 1);
          var t = form.querySelector('[data-step-top]') || form;
          var top = t.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr-h'), 10) || 72) - 16;
          if (window.scrollY > top) window.scrollTo({ top: top, behavior: 'smooth' });
          var f = panes[cur - 1].querySelector('input, select, button'); if (f) f.focus({ preventScroll: true });
        } else {
          next.classList.add('is-loading');
          setTimeout(function () {
            next.classList.remove('is-loading');
            var ok = document.getElementById(form.dataset.stepper);
            var name = form.querySelector('[name="first"], [name="name"]');
            $$('[data-echo="name"]', ok).forEach(function (s) { s.textContent = name && name.value.trim() ? ', ' + name.value.trim().split(' ')[0] : ''; });
            form.hidden = true; ok.hidden = false;
            $$('[data-hide-on-done]').forEach(function (x) { x.hidden = true; });
            var h = ok.querySelector('h1, h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
            ok.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 1100);
        }
      });
      back.addEventListener('click', function () { if (cur > 1) go(cur - 1); });
      $$('[data-save-later]', form).forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); toast('Saved on this device. Pick up where you left off any time.'); }); });
      go(1);
    });
  }
  var HOOKS = {};

  /* ---------- generic UI ---------- */
  document.addEventListener('click', function (e) {
    var s = e.target.closest('[data-save]');
    if (s) { e.preventDefault(); toggleSave(Number(s.dataset.save)); return; }
    var sc = e.target.closest('[data-scroll]');
    if (sc) { var t = document.getElementById(sc.dataset.scroll); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); var f = t.querySelector('input, textarea'); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 500); } }
  });

  function openOverlay(el, opts) {
    opts = opts || {};
    var scrim = document.createElement('div'); scrim.className = 'scrim';
    document.body.appendChild(scrim); el.hidden = false;
    document.body.style.overflow = 'hidden';
    void el.offsetWidth; void scrim.offsetWidth;
    requestAnimationFrame(function () { scrim.classList.add('is-open'); el.classList.add('is-open'); });
    var prev = document.activeElement;
    function close() {
      scrim.classList.remove('is-open'); el.classList.remove('is-open'); document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { scrim.remove(); el.hidden = true; if (prev) prev.focus(); }, 300);
      if (opts.onClose) opts.onClose();
    }
    function onKey(e) { if (e.key === 'Escape') close(); trapFocus(e, el); }
    scrim.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    $$('[data-close]', el).forEach(function (b) { b.onclick = close; });
    setTimeout(function () { var f = el.querySelector('[data-autofocus]') || el.querySelector('button, input, select'); if (f) f.focus(); }, 60);
    return close;
  }

  /* ---------- custom select (wraps a native select, keeps its value and change events) ---------- */
  var selSeq = 0, openSel = null;
  function syncSel(sel) {
    if (!sel || !sel._selBtn) return;
    var o = sel.options[sel.selectedIndex];
    sel._selBtn.querySelector('span').textContent = o ? o.text : '';
  }
  function closeSel(restoreFocus) {
    if (!openSel) return;
    var w = openSel; openSel = null;
    w.classList.remove('is-open', 'up');
    var list = w.querySelector('.sel-list'); if (list) list.remove();
    w._btn.setAttribute('aria-expanded', 'false');
    if (restoreFocus) w._btn.focus();
  }
  function enhanceSelects(root) {
    $$('select.input', root).forEach(function (sel) {
      if (sel._selBtn) { syncSel(sel); return; }
      var id = 'sel' + (++selSeq);
      var w = document.createElement('div'); w.className = 'sel';
      sel.parentNode.insertBefore(w, sel);
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'input sel-btn';
      btn.setAttribute('aria-haspopup', 'listbox'); btn.setAttribute('aria-expanded', 'false');
      var lab = sel.closest('label'); var labText = lab ? (lab.querySelector('span') || lab).textContent.trim() : (sel.getAttribute('aria-label') || '');
      if (!labText && sel.id) { var l2 = document.querySelector('label[for="' + sel.id + '"]'); if (l2) labText = l2.textContent.trim(); }
      btn.setAttribute('aria-label', labText.replace(/\s+/g, ' '));
      btn.innerHTML = '<span></span>' + icon('down', 18);
      w.appendChild(btn); w.appendChild(sel);
      w._btn = btn; sel._selBtn = btn;
      syncSel(sel);
      var active = 0;
      function open() {
        if (openSel && openSel !== w) closeSel();
        openSel = w; w.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true');
        var ul = document.createElement('ul'); ul.className = 'sel-list'; ul.id = id; ul.setAttribute('role', 'listbox'); ul.tabIndex = -1;
        ul.setAttribute('aria-label', btn.getAttribute('aria-label'));
        ul.innerHTML = Array.prototype.map.call(sel.options, function (o, i) {
          return '<li class="sel-opt" role="option" id="' + id + '-' + i + '" data-i="' + i + '" aria-selected="' + (i === sel.selectedIndex) + '"><span>' + esc(o.text) + '</span>' + icon('check', 16) + '</li>';
        }).join('');
        w.appendChild(ul);
        btn.setAttribute('aria-controls', id);
        var r = btn.getBoundingClientRect();
        if (window.innerHeight - r.bottom < 300 && r.top > 300) w.classList.add('up');
        active = Math.max(0, sel.selectedIndex); highlight();
        ul.addEventListener('mousedown', function (e) { e.preventDefault(); });
        ul.addEventListener('click', function (e) { var li = e.target.closest('[data-i]'); if (li) pick(Number(li.dataset.i)); });
        ul.addEventListener('mousemove', function (e) { var li = e.target.closest('[data-i]'); if (li && Number(li.dataset.i) !== active) { active = Number(li.dataset.i); highlight(true); } });
      }
      function highlight(noScroll) {
        var ul = w.querySelector('.sel-list'); if (!ul) return;
        $$('.sel-opt', ul).forEach(function (li, i) { li.classList.toggle('is-active', i === active); });
        btn.setAttribute('aria-activedescendant', id + '-' + active);
        var li = ul.children[active]; if (li && !noScroll) { var top = li.offsetTop, bot = top + li.offsetHeight; if (top < ul.scrollTop) ul.scrollTop = top - 4; else if (bot > ul.scrollTop + ul.clientHeight) ul.scrollTop = bot - ul.clientHeight + 4; }
      }
      function pick(i) {
        var changed = sel.selectedIndex !== i;
        sel.selectedIndex = i; syncSel(sel); closeSel(true);
        if (changed) { sel.dispatchEvent(new Event('change', { bubbles: true })); sel.dispatchEvent(new Event('input', { bubbles: true })); }
      }
      var typed = '', typedT;
      btn.addEventListener('click', function () { if (openSel === w) closeSel(); else open(); });
      btn.addEventListener('keydown', function (e) {
        var isOpen = openSel === w, n = sel.options.length;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          if (!isOpen) { open(); return; }
          active = (active + (e.key === 'ArrowDown' ? 1 : -1) + n) % n; highlight();
        } else if (e.key === 'Home' && isOpen) { e.preventDefault(); active = 0; highlight(); }
        else if (e.key === 'End' && isOpen) { e.preventDefault(); active = n - 1; highlight(); }
        else if ((e.key === 'Enter' || e.key === ' ') && isOpen) { e.preventDefault(); pick(active); }
        else if (e.key === 'Escape' && isOpen) { e.preventDefault(); e.stopPropagation(); closeSel(true); }
        else if (e.key === 'Tab' && isOpen) { closeSel(); }
        else if (e.key.length === 1 && /\S/.test(e.key)) {
          typed += e.key.toLowerCase(); clearTimeout(typedT); typedT = setTimeout(function () { typed = ''; }, 600);
          for (var i = 0; i < n; i++) { if (sel.options[i].text.toLowerCase().indexOf(typed) === 0) { if (isOpen) { active = i; highlight(); } else { pick(i); btn.focus(); } break; } }
        }
      });
    });
  }
  document.addEventListener('mousedown', function (e) { if (openSel && !openSel.contains(e.target)) closeSel(); });
  window.addEventListener('resize', function () { closeSel(); });

  /* ---------- quick request dialog ---------- */
  function openQuick(kind) {
    var cfg = {
      search: ['Request a car search', "Tell us what you're after. We check auctions and partner lots and text you matches, usually within two days.", "Make or type, budget, must-haves. For example: a 3-row SUV under $30,000 with all-wheel drive."],
      talk: ['Talk to our team', 'Leave your number and a quick note. A real person will get back to you, usually within the hour.', 'How can we help?']
    }[kind];
    var d = document.createElement('dialog'); d.className = 'modal quick-dialog'; d.setAttribute('aria-labelledby', 'qk-title');
    d.innerHTML = '<div class="modal-head"><div class="stack" style="gap:6px"><h2 class="h3" id="qk-title">' + cfg[0] + '</h2><p class="muted small">' + cfg[1] + '</p></div><button type="button" class="btn btn-icon btn-secondary" data-qk-close aria-label="Close">' + icon('close', 20) + '</button></div>' +
      '<div class="modal-body"><form id="qk-form" data-fake="qk-ok"><div class="form-grid">' +
      '<label class="field"><span>Name</span><input class="input" id="qk-name" name="name" autocomplete="name" required></label>' +
      '<label class="field"><span>Mobile phone</span><input class="input" id="qk-phone" type="tel" autocomplete="tel" placeholder="(555) 555-5555" required></label>' +
      (kind === 'search' ? '<label class="field"><span>Budget</span><select class="input" id="qk-budget"><option>Under $15,000</option><option selected>$15,000 to $25,000</option><option>$25,000 to $35,000</option><option>Over $35,000</option></select></label><label class="field"><span>Body style</span><select class="input" id="qk-body"><option>Any</option><option>SUV</option><option>Truck</option><option>Sedan</option><option>Coupe or convertible</option><option>Van or minivan</option><option>Electric or hybrid</option></select></label>' : '') +
      '<label class="field span-all"><span>' + (kind === 'search' ? 'What are you looking for?' : 'Message') + '</span><textarea class="input" id="qk-msg" rows="3" placeholder="' + esc(cfg[2]) + '" required></textarea></label>' +
      '<label class="check span-all"><input type="checkbox" id="qk-consent" required><span>I agree to be contacted about this request.</span></label>' +
      '<div class="span-all"><button class="btn btn-primary btn-lg btn-block" type="submit">' + (kind === 'search' ? 'Start my car search' : 'Send message') + '</button></div></div></form>' +
      '<div id="qk-ok" class="success" hidden><span class="success-icon">' + icon('check', 28) + '</span><h3 class="h3">Thanks<span data-echo="name"></span>, we\'re on it</h3><p class="muted">' + (kind === 'search' ? "We'll text you the first matches within two business days." : "We'll reply within one business day.") + '</p><button type="button" class="btn btn-secondary" data-qk-close>Close</button></div></div>';
    document.body.appendChild(d);
    bindForms(d); enhanceSelects(d);
    d.showModal();
    function close() { d.close(); }
    d.addEventListener('close', function () { setTimeout(function () { d.remove(); }, 50); });
    d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('[data-qk-close]')) close(); });
    setTimeout(function () { var f = d.querySelector('#qk-name'); if (f) f.focus(); }, 30);
  }
  document.addEventListener('click', function (e) { var q = e.target.closest('[data-quick]'); if (q) { e.preventDefault(); openQuick(q.dataset.quick); } });

  /* =========================================================
     PAGES
     ========================================================= */
  var PAGES = {};

  /* ---------- home ---------- */
  PAGES.home = function () {
    var feat = [1, 2, 3, 5, 6, 8].map(function (id) { return BYID[id]; });
    var fg = $('#featured'); if (fg) fg.innerHTML = feat.map(vcard).join('');
    var bg = $('#body-grid');
    if (bg) bg.innerHTML = BODIES.map(function (b) {
      var sample = V.filter(function (v) { return v.body === b.key; })[0];
      var count = V.filter(function (v) { return v.body === b.key; }).length;
      return '<a class="body-card" href="inventory.html#' + b.key + '"><div class="photo photo-32 tone-' + b.key + '">' + car(sample) + '</div><div><span class="stack"><strong>' + b.name + '</strong><span class="muted small num">' + count + ' available</span></span>' + icon('arrow', 18, 'go') + '</div></a>';
    }).join('');
    var ranges = [[0, 15000], [15000, 25000], [25000, 35000], [35000, 1e9]];
    $$('[data-budget]').forEach(function (el, i) {
      var r = ranges[i]; var c = V.filter(function (v) { return v.price >= r[0] && v.price < r[1]; }).length;
      el.textContent = c + (c === 1 ? ' vehicle' : ' vehicles');
    });
    var hf = $('#hero-car'); if (hf) hf.innerHTML = car(BYID[1], '', 'transform: scale(1.02)');
    $$('[data-total]').forEach(function (el) { el.textContent = V.length; });
    var form = $('#hero-search');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      sessSet('search', { body: $('#hs-body').value, make: $('#hs-make').value, max: $('#hs-max').value });
      location.href = 'inventory.html#search';
    });
    var makes = uniq(V.map(function (v) { return v.make; })).sort();
    var ms = $('#hs-make'); if (ms) ms.insertAdjacentHTML('beforeend', makes.map(function (m) { return '<option>' + m + '</option>'; }).join(''));
  };
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }

  /* ---------- inventory ---------- */
  PAGES.inventory = function () {
    var PER = 12;
    var S = { q: '', body: [], make: [], fuel: [], drive: [], trans: [], color: [], seats: [], pmin: 0, pmax: 0, ymin: 0, ymax: 0, mmax: 0, sort: 'rec', page: 1, saved: false, deals: false };
    var makes = uniq(V.map(function (v) { return v.make; })).sort();
    var SEATS = { '2 seats': function (n) { return n <= 2; }, '4 to 5': function (n) { return n >= 4 && n <= 5; }, '6 to 7': function (n) { return n >= 6 && n <= 7; }, '8 or more': function (n) { return n >= 8; } };
    function transOf(v) { return /manual/i.test(v.trans) ? 'Manual' : 'Automatic'; }
    function match(v, skip) {
      if (S.saved && saved().indexOf(v.id) === -1) return false;
      if (S.deals && !(v.loc === 'Omaha, NE' && v.price < 30000)) return false;
      if (S.q) { var hay = (full(v) + ' ' + v.ext + ' ' + v.fuel + ' ' + v.drive + ' ' + BODY[v.body].name + ' ' + v.feats.map(function (f) { return F[f]; }).join(' ')).toLowerCase(); if (!S.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; })) return false; }
      if (skip !== 'body' && S.body.length && S.body.indexOf(v.body) === -1) return false;
      if (skip !== 'make' && S.make.length && S.make.indexOf(v.make) === -1) return false;
      if (skip !== 'fuel' && S.fuel.length && S.fuel.indexOf(v.fuel) === -1) return false;
      if (skip !== 'drive' && S.drive.length && S.drive.indexOf(v.drive) === -1) return false;
      if (skip !== 'trans' && S.trans.length && S.trans.indexOf(transOf(v)) === -1) return false;
      if (skip !== 'color' && S.color.length && S.color.indexOf(v.fam) === -1) return false;
      if (skip !== 'seats' && S.seats.length && !S.seats.some(function (k) { return SEATS[k](v.seats); })) return false;
      if (S.pmin && v.price < S.pmin) return false;
      if (S.pmax && v.price > S.pmax) return false;
      if (S.ymin && v.y < S.ymin) return false;
      if (S.ymax && v.y > S.ymax) return false;
      if (S.mmax && v.miles > S.mmax) return false;
      return true;
    }
    var SORTS = {
      rec: function (a, b) { return (a.badge === 'Just arrived' ? 0 : 1) - (b.badge === 'Just arrived' ? 0 : 1) || a.listed - b.listed; },
      new: function (a, b) { return a.listed - b.listed; },
      plh: function (a, b) { return a.price - b.price; },
      phl: function (a, b) { return b.price - a.price; },
      mil: function (a, b) { return a.miles - b.miles; },
      year: function (a, b) { return b.y - a.y || a.miles - b.miles; }
    };

    // build filter panel
    function checks(group, opts, getCount) {
      return opts.map(function (o) {
        var val = o.value || o, lab = o.label || o, id = 'f-' + group + '-' + String(val).replace(/\W+/g, '');
        return '<label class="fcheck" for="' + id + '"><input type="checkbox" id="' + id + '" data-group="' + group + '" value="' + esc(val) + '"><span>' + esc(lab) + '</span><span class="count" data-count="' + group + ':' + esc(val) + '"></span></label>';
      }).join('');
    }
    function chips(group, opts) {
      return '<div class="chips-wrap">' + opts.map(function (o) { return '<button type="button" class="chip chip-sq" data-group="' + group + '" data-value="' + esc(o) + '" aria-pressed="false">' + esc(o) + '</button>'; }).join('') + '</div>';
    }
    function sel(id, label, opts) {
      return '<label class="field"><span class="small muted">' + label + '</span><select class="input" id="' + id + '">' + opts.map(function (o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('') + '</select></label>';
    }
    function group(title, body, open) {
      return '<details class="fgroup"' + (open ? ' open' : '') + '><summary>' + title + icon('down', 18) + '</summary><div class="fgroup-body">' + body + '</div></details>';
    }
    var priceOpts = [[0, 'No min']].concat([10000, 15000, 20000, 25000, 30000, 35000].map(function (p) { return [p, money(p)]; }));
    var priceMax = [[0, 'No max']].concat([15000, 20000, 25000, 30000, 35000, 40000].map(function (p) { return [p, money(p)]; }));
    var years = [2017, 2018, 2019, 2020, 2021, 2022];
    $('#filters-body').innerHTML =
      '<div class="active-filters" id="active-filters"></div>' +
      group('Body style', checks('body', BODIES.map(function (b) { return { value: b.key, label: b.name }; })), true) +
      group('Price', '<div class="range-pair">' + sel('f-pmin', 'Min', priceOpts) + sel('f-pmax', 'Max', priceMax) + '</div>', true) +
      group('Make', checks('make', makes), true) +
      group('Year', '<div class="range-pair">' + sel('f-ymin', 'From', [[0, 'Any']].concat(years.map(function (y) { return [y, y]; }))) + sel('f-ymax', 'To', [[0, 'Any']].concat(years.map(function (y) { return [y, y]; }))) + '</div>') +
      group('Mileage', sel('f-mmax', 'Maximum', [[0, 'Any mileage'], [30000, 'Under 30,000 mi'], [45000, 'Under 45,000 mi'], [60000, 'Under 60,000 mi'], [75000, 'Under 75,000 mi']])) +
      group('Fuel type', chips('fuel', ['Gas', 'Diesel', 'Hybrid', 'Electric'])) +
      group('Drivetrain', chips('drive', ['FWD', 'RWD', 'AWD', '4WD'])) +
      group('Transmission', chips('trans', ['Automatic', 'Manual'])) +
      group('Exterior color', '<div class="swatches">' + Object.keys(FAM).map(function (k) { return '<button type="button" class="swatch" data-group="color" data-value="' + k + '" aria-pressed="false" aria-label="' + k + '" title="' + k + '" style="background:' + FAM[k] + '"></button>'; }).join('') + '</div>') +
      group('Seats', chips('seats', Object.keys(SEATS)));

    $('#quick-chips').innerHTML = BODIES.map(function (b) { return '<button type="button" class="chip" data-group="body" data-value="' + b.key + '" aria-pressed="false">' + b.name + '</button>'; }).join('');

    function toggle(arr, val) { var i = arr.indexOf(val); if (i > -1) arr.splice(i, 1); else arr.push(val); }
    function syncControls() {
      $$('input[data-group]').forEach(function (c) { c.checked = S[c.dataset.group].indexOf(c.value) > -1; });
      $$('button[data-group]').forEach(function (b) { b.setAttribute('aria-pressed', S[b.dataset.group].indexOf(b.dataset.value) > -1); });
      $('#f-pmin').value = S.pmin; $('#f-pmax').value = S.pmax; $('#f-ymin').value = S.ymin; $('#f-ymax').value = S.ymax; $('#f-mmax').value = S.mmax;
      $('#sort').value = S.sort;
      if (document.activeElement !== $('#q')) $('#q').value = S.q;
      ['#f-pmin', '#f-pmax', '#f-ymin', '#f-ymax', '#f-mmax', '#sort'].forEach(function (id) { syncSel($(id)); });
    }
    function activeList() {
      var a = [];
      S.body.forEach(function (k) { a.push(['body', k, BODY[k].name]); });
      S.make.forEach(function (k) { a.push(['make', k, k]); });
      ['fuel', 'drive', 'trans', 'color', 'seats'].forEach(function (g) { S[g].forEach(function (k) { a.push([g, k, g === 'seats' ? k + ' seats' : k]); }); });
      if (S.pmin) a.push(['pmin', 0, 'From ' + money(S.pmin)]);
      if (S.pmax) a.push(['pmax', 0, 'Under ' + money(S.pmax)]);
      if (S.ymin) a.push(['ymin', 0, S.ymin + ' or newer']);
      if (S.ymax) a.push(['ymax', 0, S.ymax + ' or older']);
      if (S.mmax) a.push(['mmax', 0, 'Under ' + num(S.mmax) + ' mi']);
      if (S.q) a.push(['q', '', '"' + S.q + '"']);
      if (S.saved) a.push(['saved', false, 'Saved only']);
      if (S.deals) a.push(['deals', false, 'Free delivery deals']);
      return a;
    }
    function render(keepPage) {
      if (!keepPage) S.page = 1;
      var res = V.filter(function (v) { return match(v); }).sort(SORTS[S.sort]);
      var pages = Math.max(1, Math.ceil(res.length / PER));
      if (S.page > pages) S.page = pages;
      var slice = res.slice((S.page - 1) * PER, S.page * PER);
      var grid = $('#results');
      if (!res.length) {
        grid.innerHTML = '<div class="empty card span-all" style="grid-column:1/-1">' +
          '<span class="icon-box ib-accent" style="width:56px;height:56px">' + icon('search', 26) + '</span>' +
          '<h2 class="h3">' + (S.saved ? 'No saved cars yet' : 'No cars match all of those filters') + '</h2>' +
          '<p class="muted" style="max-width:46ch">' + (S.saved ? 'Tap the heart on any car to keep it here and compare later.' : 'Try removing a filter or widening your price range. New cars arrive every week.') + '</p>' +
          '<div class="cta-actions" style="justify-content:center"><button type="button" class="btn btn-primary" id="clear-2">' + (S.saved ? 'Browse all cars' : 'Clear all filters') + '</button>' +
          (activeList().length > 1 && !S.saved ? '<button type="button" class="btn btn-secondary" id="undo-last">Remove last filter</button>' : '') + '</div>' +
          '<form class="ftr-alerts" id="empty-alert" style="background:var(--surface-2);max-width:420px;width:100%;margin-top:12px" novalidate><label for="ea-email" style="color:var(--ink)">Get an alert when a match arrives</label><div style="display:flex;gap:8px;flex-wrap:wrap"><input id="ea-email" class="input" type="email" placeholder="Email address" style="background:var(--surface);border-color:var(--field-edge);color:var(--ink);flex:1 1 180px;min-height:48px"><button class="btn btn-secondary" type="submit">Create alert</button></div></form></div>';
        $('#clear-2').onclick = clearAll;
        var u = $('#undo-last'); if (u) u.onclick = function () { var a = activeList(); removeFilter(a[a.length - 1]); };
        $('#empty-alert').onsubmit = function (e) { e.preventDefault(); var i = $('#ea-email'); if (!/^\S+@\S+\.\S+$/.test(i.value)) { toast('Enter an email like name@example.com', 'info'); i.focus(); return; } i.value = ''; toast("Alert created. We'll email you when a match arrives."); };
      } else {
        var html = slice.map(vcard);
        if (slice.length > 6) html.splice(6, 0, helpCard());
        grid.innerHTML = html.join('');
      }
      var word = res.length === 1 ? 'vehicle' : 'vehicles';
      $('#count').textContent = S.saved ? res.length + ' saved ' + word : res.length + ' ' + word + ' available';
      $('#showing').textContent = res.length ? 'Showing ' + ((S.page - 1) * PER + 1) + ' to ' + Math.min(S.page * PER, res.length) + ' of ' + res.length : '';
      $('#show-results').textContent = res.length ? 'Show ' + res.length + ' ' + word : 'No matches yet';
      // facet counts
      ['body', 'make'].forEach(function (g) {
        $$('[data-count^="' + g + ':"]').forEach(function (el) {
          var val = el.dataset.count.split(':')[1];
          var c = V.filter(function (v) { return match(v, g) && (g === 'body' ? v.body : v.make) === val; }).length;
          el.textContent = c; el.closest('.fcheck').classList.toggle('is-zero', c === 0);
        });
      });
      // active chips
      var act = activeList();
      $('#active-filters').innerHTML = act.map(function (a, i) { return '<button type="button" class="chip chip-remove" data-remove="' + i + '" aria-label="Remove filter: ' + esc(a[2]) + '">' + esc(a[2]) + icon('close', 16) + '</button>'; }).join('');
      $('#active-filters').hidden = !act.length;
      $('#clear-all').hidden = !act.length;
      var fc = $('#filter-count'); fc.textContent = act.length ? ' (' + act.length + ')' : '';
      // pager
      var pg = $('#pager');
      if (pages > 1) {
        var b = '<button type="button" data-pg="' + (S.page - 1) + '"' + (S.page === 1 ? ' disabled' : '') + ' aria-label="Previous page">' + icon('left', 18) + '</button>';
        for (var p = 1; p <= pages; p++) b += '<button type="button" data-pg="' + p + '"' + (p === S.page ? ' aria-current="page"' : '') + '>' + p + '</button>';
        b += '<button type="button" data-pg="' + (S.page + 1) + '"' + (S.page === pages ? ' disabled' : '') + '>Next ' + icon('right', 18) + '</button>';
        pg.innerHTML = b; pg.hidden = false;
      } else { pg.innerHTML = ''; pg.hidden = true; }
      var cmp = $('#compare-btn'); cmp.hidden = !(S.saved && res.length >= 2);
      syncControls();
    }
    function helpCard() {
      return '<div class="help-card"><div style="flex:1 1 320px;min-width:0"><h2 class="h3" style="margin-bottom:4px">Not seeing the right car?</h2><p>Tell us what you need. We search auctions and partner lots and text you matches.</p></div><button type="button" class="btn btn-light" data-quick="search">Request a car search</button></div>';
    }
    function removeFilter(a) {
      if (!a) return;
      var g = a[0];
      if (Array.isArray(S[g])) toggle(S[g], a[1]); else S[g] = a[1];
      render(); if (g === 'saved' || g === 'body') banner();
    }
    function clearAll() {
      S.q = ''; S.body = []; S.make = []; S.fuel = []; S.drive = []; S.trans = []; S.color = []; S.seats = [];
      S.pmin = S.pmax = S.ymin = S.ymax = S.mmax = 0; S.saved = false; S.deals = false;
      banner(); render();
    }
    function banner() {
      var b = $('#cat-banner'), h = $('#inv-title'), crumb = $('#crumb-current');
      if (S.saved) { h.textContent = 'Your saved vehicles'; b.hidden = true; crumb.textContent = 'Saved'; document.title = 'Saved vehicles · Redwater Motors'; return; }
      if (S.body.length === 1 && !S.make.length) {
        var bd = BODY[S.body[0]], sample = V.filter(function (v) { return v.body === bd.key; })[0];
        h.textContent = { suv: 'Used SUVs for sale', truck: 'Used trucks for sale', sedan: 'Used sedans for sale', coupe: 'Used coupes and convertibles', van: 'Used vans and minivans', electric: 'Used electric and hybrid cars' }[bd.key];
        b.className = 'cat-banner promo-' + (['suv', 'van'].indexOf(bd.key) > -1 ? 'blue' : bd.key === 'electric' ? 'green' : 'sand');
        b.innerHTML = '<div class="stack" style="gap:8px"><span class="badge b-neutral" style="align-self:flex-start">' + bd.name + '</span><p class="lead">' + bd.blurb + '</p></div><div class="photo tone-' + bd.key + '">' + car(sample) + '</div>';
        b.hidden = false; crumb.textContent = bd.name; document.title = bd.name + ' for sale · Redwater Motors';
      } else {
        h.textContent = S.deals ? 'Free delivery deals' : 'Used cars for sale'; b.hidden = true; crumb.textContent = S.deals ? 'Delivery deals' : 'All vehicles'; document.title = 'Inventory · Redwater Motors';
      }
    }
    function fromHash() {
      var h = location.hash.replace('#', '');
      clearAllSilently();
      if (BODY[h]) S.body = [h];
      else if (h === 'saved') S.saved = true;
      else if (h === 'delivery-deals') S.deals = true;
      else if (h === 'under-15000') S.pmax = 15000;
      else if (h === '15000-25000') { S.pmin = 15000; S.pmax = 25000; }
      else if (h === '25000-35000') { S.pmin = 25000; S.pmax = 35000; }
      else if (h === 'over-35000') S.pmin = 35000;
      else if (h.indexOf('make-') === 0) { var m = makes.filter(function (x) { return x.toLowerCase() === h.slice(5); })[0]; if (m) S.make = [m]; }
      else if (h === 'search') { var s = sessGet('search', {}); if (s.body) S.body = [s.body]; if (s.make) S.make = [s.make]; if (s.max) S.pmax = Number(s.max); }
      banner(); render();
    }
    function clearAllSilently() { S.q = ''; S.body = []; S.make = []; S.fuel = []; S.drive = []; S.trans = []; S.color = []; S.seats = []; S.pmin = S.pmax = S.ymin = S.ymax = S.mmax = 0; S.saved = false; S.deals = false; }

    // events
    document.addEventListener('change', function (e) {
      var t = e.target;
      if (t.matches('input[data-group]')) { toggle(S[t.dataset.group], t.value); banner(); render(); }
      else if (t.id === 'f-pmin') { S.pmin = Number(t.value); render(); }
      else if (t.id === 'f-pmax') { S.pmax = Number(t.value); render(); }
      else if (t.id === 'f-ymin') { S.ymin = Number(t.value); render(); }
      else if (t.id === 'f-ymax') { S.ymax = Number(t.value); render(); }
      else if (t.id === 'f-mmax') { S.mmax = Number(t.value); render(); }
      else if (t.id === 'sort') { S.sort = t.value; render(); }
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-group]');
      if (b) { toggle(S[b.dataset.group], b.dataset.value); if (b.dataset.group === 'body') banner(); render(); return; }
      var r = e.target.closest('[data-remove]');
      if (r) { removeFilter(activeList()[Number(r.dataset.remove)]); return; }
      var p = e.target.closest('[data-pg]');
      if (p && !p.disabled) { S.page = Number(p.dataset.pg); render(true); $('#results-top').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
    var qt;
    $('#q').addEventListener('input', function (e) { clearTimeout(qt); qt = setTimeout(function () { S.q = e.target.value.trim(); render(); }, 160); });
    $('#search-form').addEventListener('submit', function (e) { e.preventDefault(); S.q = $('#q').value.trim(); render(); });
    $('#clear-all').addEventListener('click', function (e) { e.preventDefault(); clearAll(); });
    document.addEventListener('rw:saved', function () { if (S.saved) render(true); });
    window.addEventListener('hashchange', fromHash);

    // mobile sheet
    var sheet = $('#filters'), closeSheet = null;
    $('#filter-toggle').addEventListener('click', function () {
      sheet.classList.add('is-open'); document.body.style.overflow = 'hidden';
      setTimeout(function () { $('#filters-close').focus(); }, 50);
    });
    function shut() { sheet.classList.remove('is-open'); document.body.style.overflow = ''; $('#filter-toggle').focus(); }
    $('#filters-close').addEventListener('click', shut);
    $('#show-results').addEventListener('click', function () { shut(); $('#results-top').scrollIntoView({ behavior: 'smooth' }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sheet.classList.contains('is-open')) shut(); });

    // compare
    $('#compare-btn').addEventListener('click', function () {
      var list = saved().map(function (id) { return BYID[id]; }).filter(Boolean).slice(0, 3);
      var rows = [['Price', function (v) { return '<strong class="num">' + money(v.price) + '</strong>'; }], ['Est. payment', function (v) { return money(monthly(v)) + '/mo'; }], ['Mileage', function (v) { return num(v.miles) + ' mi'; }], ['MPG', function (v) { return v.mpg; }], ['Drivetrain', function (v) { return v.drive; }], ['Fuel', function (v) { return v.fuel; }], ['Seats', function (v) { return v.seats; }], ['Highlights', function (v) { return v.feats.slice(0, 4).map(function (f) { return F[f]; }).join('<br>'); }], ['Inspection', function () { return '<span class="badge b-ok">Passed</span>'; }]];
      var d = $('#compare-dialog');
      $('#compare-body').innerHTML = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:separate;border-spacing:0;min-width:520px;font-size:15px"><thead><tr><th></th>' + list.map(function (v) { return '<th style="text-align:left;padding:8px 10px;vertical-align:bottom"><div class="photo tone-' + v.body + '" style="border-radius:6px;margin-bottom:8px">' + car(v) + '</div><a href="vehicle.html#v' + v.id + '" style="color:var(--ink)">' + title(v) + '</a></th>'; }).join('') + '</tr></thead><tbody>' +
        rows.map(function (r, i) { return '<tr style="background:' + (i % 2 ? 'transparent' : 'var(--surface-2)') + '"><th scope="row" style="text-align:left;padding:10px;color:var(--muted);font-weight:500;white-space:nowrap">' + r[0] + '</th>' + list.map(function (v) { return '<td style="padding:10px;vertical-align:top" class="num">' + r[1](v) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>' +
        (saved().length > 3 ? '<p class="muted small" style="margin-top:12px">Showing your three most recently saved cars.</p>' : '');
      d.showModal();
    });
    $('#compare-close').addEventListener('click', function () { $('#compare-dialog').close(); });
    $('#compare-dialog').addEventListener('click', function (e) { if (e.target === e.currentTarget) e.currentTarget.close(); });

    $('#est-note').textContent = EST_NOTE;
    fromHash();
  };

  /* ---------- vehicle ---------- */
  PAGES.vehicle = function () {
    var root = $('#vd-root'), state = { i: 0, down: 0, term: 60, tier: 'good' };
    var TIERS = { excellent: [5.5, 7.5, 'Excellent (720+)'], good: [7.5, 10, 'Good (660 to 719)'], fair: [10, 14, 'Fair (600 to 659)'], rebuilding: [14, 19, 'Rebuilding (under 600)'] };
    function current() { var m = /^#v(\d+)$/.exec(location.hash); return (m && BYID[Number(m[1])]) || V[0]; }
    function featIcon(f) { return { heat: 'flame', cp: 'device', cam: 'camera', acc: 'gauge', lane: 'shield', bsm: 'eye', roof: 'sun', glass: 'sun', push: 'power', key: 'key', zone: 'thermo', cool: 'thermo', tow: 'truck', bed: 'truck', awdx: 'truck', third: 'users', slide: 'users', lift: 'upload', remote: 'power', audio: 'music', manual: 'gear', top: 'sun' }[f] || 'check'; }
    function render() {
      var v = current(); state.i = 0; state.down = Math.round(v.price * 0.1 / 500) * 500;
      pushRecent(v.id);
      document.title = full(v) + ' · Redwater Motors';
      var on = isSaved(v.id), seed = v.id * 7;
      var frames = []; for (var k = 0; k < v.photos; k++) frames.push(k);
      var thumbs = frames.map(function (k) { var f = frameHTML(v, k); return '<button type="button" class="' + f.tone + '" data-thumb="' + k + '" aria-label="Show photo ' + (k + 1) + ': ' + f.label + '"' + (k === 0 ? ' aria-current="true"' : '') + '>' + f.html.replace(/^<div class="frame [^"]*">/, '').replace(/<\/div>$/, '') + '</button>'; }).join('');
      var specs = [['Mileage', num(v.miles) + ' miles'], ['Engine', v.engine], ['Transmission', v.trans], ['Drivetrain', { AWD: 'All-wheel drive', '4WD': 'Four-wheel drive', FWD: 'Front-wheel drive', RWD: 'Rear-wheel drive' }[v.drive]], ['Fuel type', v.fuel], [/MPGe/.test(v.mpg) ? 'Efficiency' : 'MPG', v.mpg], ['Exterior', v.ext], ['Interior', v.int], ['Seats', v.seats], ['Doors', v.doors], ['Title status', 'Clean' + (v.id % 3 === 0 ? ', two owners' : ', one owner')], ['Stock number', stock(v)]];
      var insp = [['Engine and transmission', 'No leaks, smooth shifting, fluids changed'], ['Brakes', 'Front pads ' + (6 + seed % 4) + ' mm, rear pads ' + (5 + seed % 4) + ' mm'], ['Tires', (6 + seed % 5) + '/32 in tread on all four'], ['Electrical and safety tech', 'All lights, sensors and cameras working'], ['Interior', 'No tears, stains or odors'], ['Road test', (12 + seed % 10) + '-mile test at city and highway speeds']];
      if (v.fuel === 'Electric' || v.fuel === 'Hybrid') insp[0] = [v.fuel === 'Electric' ? 'Battery and motor' : 'Hybrid system', 'Battery health tested, no fault codes'];
      var inspDate = new Date(2026, 8, 30 - (v.listed % 20)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      var bd = BODY[v.body];

      $('#crumbs').innerHTML = '<a href="index.html">Home</a><span class="sep" aria-hidden="true">/</span><a href="inventory.html">Inventory</a><span class="sep" aria-hidden="true">/</span><a href="inventory.html#' + v.body + '">' + bd.name + '</a><span class="sep" aria-hidden="true">/</span><span aria-current="page">' + esc(full(v)) + '</span>';

      root.innerHTML =
        '<section class="vd-gallery" aria-label="Photos">' +
          '<div class="gal-main ' + frameHTML(v, 0).tone + '" id="gal-main">' + frameHTML(v, 0).html +
            '<span class="gal-caption" id="gal-cap"></span>' +
            '<button type="button" class="gal-arrow gal-prev" data-gal="-1" aria-label="Previous photo">' + icon('left', 22) + '</button><button type="button" class="gal-arrow gal-next" data-gal="1" aria-label="Next photo">' + icon('right', 22) + '</button>' +
            '<div class="gal-tools"><button type="button" id="video-btn">' + icon('play', 18) + '<span>Walkaround video</span></button><button type="button" class="icon-only" id="lb-open" aria-label="View photos full screen">' + icon('expand', 18) + '</button></div>' +
          '</div><div class="gal-thumbs" id="gal-thumbs">' + thumbs + '</div></section>' +

        '<section class="vd-title" aria-labelledby="v-title">' +
          '<div style="display:flex;flex-wrap:wrap;gap:8px"><span class="badge ' + badgeCls(v.badge) + '">' + v.badge + '</span>' + (v.id % 3 ? '<span class="badge b-info">One owner</span>' : '') + '<span class="badge b-neutral">Clean title</span>' + (v.loc === 'Ships nationwide' ? '<span class="badge b-violet">Ships nationwide</span>' : '') + '</div>' +
          '<h1 id="v-title" class="h1">' + esc(full(v)) + '</h1>' +
          '<p class="lead num">' + v.drive + ' · ' + num(v.miles) + ' miles · ' + esc(v.ext) + ' · ' + (v.loc === 'Ships nationwide' ? 'Omaha, NE' : v.loc) + '</p>' +
          '<div class="id-row"><div class="id-chip"><span class="lbl">Stock</span><strong>' + stock(v) + '</strong><button type="button" class="btn btn-secondary btn-sm" data-copy="' + stock(v) + '" data-copy-msg="Stock number copied">' + icon('copy', 16) + ' Copy</button></div>' +
          '<div class="id-chip"><span class="lbl">VIN</span><strong>' + vin(v) + '</strong><button type="button" class="btn btn-secondary btn-sm" data-copy="' + vin(v) + '" data-copy-msg="VIN copied">' + icon('copy', 16) + ' Copy</button></div></div>' +
        '</section>' +

        '<aside class="vd-aside" aria-label="Price and contact">' +
          '<div class="price-card"><div><div class="price-big">' + money(v.price) + '</div>' +
            '<div style="margin-top:8px;display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 12px"><strong class="num" id="est-line">Est. ' + money(monthly(v)) + '/mo</strong><button type="button" class="btn btn-quiet btn-sm" id="adjust-btn" style="color:var(--link);padding:0 6px">' + icon('calc', 16) + ' Adjust payment</button></div>' +
            '<p class="muted tiny" style="margin-top:6px" id="est-note-v">Includes our fees. Excludes taxes and registration. Estimate uses 10% down, 60 months, example 7.9% APR.</p></div>' +
            '<div class="act-grid"><button type="button" class="btn btn-primary btn-lg btn-block vd-actions-desktop" data-scroll="inquiry">Check availability</button>' +
              '<div class="act-row"><a class="btn btn-secondary" href="tel:' + PHONE_TEL + '">' + icon('phone', 18) + ' Call now</a><a class="btn btn-secondary" href="sms:' + TEXT_TEL + '">' + icon('message', 18) + ' Text us</a></div>' +
              '<a class="btn btn-secondary btn-block" href="reserve.html#v' + v.id + '">Reserve this vehicle</a></div>' +
            '<div style="display:flex;justify-content:center;gap:6px"><button type="button" class="btn btn-quiet btn-sm heart-inline" data-save="' + v.id + '" aria-pressed="' + on + '" aria-label="' + (on ? 'Remove ' : 'Save ') + esc(title(v)) + (on ? ' from saved' : '') + '">' + icon('heart', 18) + ' <span data-save-text>' + (on ? 'Saved' : 'Save') + '</span></button><button type="button" class="btn btn-quiet btn-sm" id="share-btn">' + icon('share', 18) + ' Share</button></div>' +
          '</div>' +
          '<ul class="mini-trust"><li>' + icon('shield', 20) + 'Multi-point inspection passed</li><li>' + icon('exchange', 20) + '7-day exchange (example terms)</li><li>' + icon('tag', 20) + 'Clear pricing, fees included</li><li>' + icon('truck', 20) + 'Delivers to all 50 states</li></ul>' +
        '</aside>' +

        '<div class="vd-details">' +
          '<section aria-labelledby="specs-h"><h2 id="specs-h" class="h3" style="margin-bottom:16px">Key specs</h2><dl class="spec-list">' + specs.map(function (s) { return '<div><dt>' + s[0] + '</dt><dd>' + esc(s[1]) + '</dd></div>'; }).join('') + '</dl></section>' +
          '<section aria-labelledby="hl-h"><h2 id="hl-h" class="h3" style="margin-bottom:16px">Highlights</h2><ul class="feat-grid">' + v.feats.map(function (f) { return '<li>' + icon(featIcon(f), 26) + F[f] + '</li>'; }).join('') + '</ul></section>' +
          '<section class="card card-pad" aria-labelledby="insp-h"><div class="row-between" style="margin-bottom:18px;align-items:center"><h2 id="insp-h" class="h3">Inspection and history</h2><span class="badge b-ok">Passed on ' + inspDate + '</span></div>' +
            '<ul class="insp-list">' + insp.map(function (i) { return '<li>' + icon('check', 20) + '<span><strong>' + i[0] + '</strong><small>' + i[1] + '</small></span></li>'; }).join('') + '</ul>' +
            '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;margin-top:20px"><button type="button" class="btn btn-secondary" id="history-btn">' + icon('doc', 18) + ' View vehicle history report</button><button type="button" class="link-arrow btn-quiet" style="border:0;background:none;color:var(--link)" id="report-btn">See the full inspection report ' + icon('arrow', 18) + '</button></div>' +
            '<p class="muted small" style="margin-top:16px">Service records: maintenance history on file. Ask us for copies.</p></section>' +
          '<section aria-labelledby="about-h"><h2 id="about-h" class="h3" style="margin-bottom:12px">About this ' + esc(v.model) + '</h2><div class="prose">' + v.desc.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></section>' +
          '<section class="card card-pad" aria-labelledby="price-h"><h2 id="price-h" class="h3" style="margin-bottom:10px">Price breakdown</h2><dl class="breakdown"><div><dt>Vehicle price</dt><dd>' + money(v.price) + '</dd></div><div><dt>Documentation fee</dt><dd>Included</dd></div><div><dt>Estimated taxes and registration</dt><dd class="muted" style="font-weight:500">Based on your ZIP code</dd></div><div><dt>Delivery</dt><dd class="muted" style="font-weight:500">' + (v.loc === 'Ships nationwide' ? 'Quoted for your address' : 'Free pickup in Omaha') + '</dd></div><div class="total"><dt><strong>Price before taxes</strong></dt><dd>' + money(v.price) + '</dd></div></dl></section>' +

          '<section id="inquiry" class="card card-raised card-pad" aria-labelledby="inq-h">' +
            '<form id="inq-form" data-fake="inq-ok"><h2 id="inq-h" class="h3" style="margin-bottom:4px">Check availability</h2><p class="muted" style="margin-bottom:20px">A real person replies within one business day, usually within the hour.</p>' +
              '<div class="form-grid"><label class="field"><span>Full name</span><input class="input" name="name" id="inq-name" autocomplete="name" required></label>' +
              '<label class="field"><span>Phone</span><input class="input" type="tel" id="inq-phone" name="phone" autocomplete="tel" placeholder="(555) 555-5555" required></label>' +
              '<label class="field span-all"><span>Email</span><input class="input" type="email" id="inq-email" name="email" autocomplete="email" required></label>' +
              '<label class="field span-all"><span>Message</span><textarea class="input" id="inq-msg" name="message" rows="4">Hi, is the ' + esc(full(v)) + ' (stock ' + stock(v) + ') still available? I\'d like to know about delivery to my area.</textarea></label>' +
              '<label class="check span-all"><input type="checkbox" id="inq-consent" required><span>I agree to be contacted by phone, text or email about this vehicle. Message and data rates may apply. See our <a href="privacy.html">privacy policy</a>.</span></label>' +
              '<div class="span-all"><button class="btn btn-primary btn-lg" type="submit">Send inquiry</button></div></div></form>' +
            '<div id="inq-ok" class="success" hidden><span class="success-icon">' + icon('check', 28) + '</span><h2 class="h3">Thanks<span data-echo="name"></span>, we got your message</h2><p class="muted">We\'ll confirm the ' + esc(v.model) + ' is available and reply within one business day. Need an answer sooner? Call <strong class="num" style="color:var(--ink)">' + PHONE + '</strong>.</p><button type="button" class="btn btn-secondary" data-reset="inq-form">Send another message</button></div>' +
          '</section>' +

          '<section class="grid g-3" aria-label="Our promises" style="gap:14px"><div class="promo promo-green" style="padding:22px;gap:4px"><strong>Fully inspected</strong><span class="muted small">Checked by our technicians, with the report shared openly.</span></div><div class="promo promo-blue" style="padding:22px;gap:4px"><strong>Clear next steps</strong><span class="muted small">You always know what happens after you reach out.</span></div><div class="promo promo-sand" style="padding:22px;gap:4px"><strong>Delivery help</strong><span class="muted small">We plan transport to your door and track it for you.</span></div></section>' +
          '<section class="grid g-2" aria-label="Financing and trade-in" style="gap:14px"><div class="card card-pad stack" style="gap:10px;align-items:flex-start"><h3 class="h4">Financing this car?</h3><p class="muted small">See your rate with a soft credit check where available.</p><a class="btn btn-secondary btn-sm" href="financing.html#apply">Get pre-qualified</a></div><div class="card card-pad stack" style="gap:10px;align-items:flex-start"><h3 class="h4">Have a trade-in?</h3><p class="muted small">Get an offer and apply it straight to this ' + esc(v.model) + '.</p><a class="btn btn-secondary btn-sm" href="sell.html">Value my trade</a></div></section>' +
        '</div>';

      // similar & recent
      var sim = V.filter(function (x) { return x.id !== v.id; }).sort(function (a, b) { return (a.body === v.body ? 0 : 1) - (b.body === v.body ? 0 : 1) || Math.abs(a.price - v.price) - Math.abs(b.price - v.price); }).slice(0, 4);
      $('#similar').innerHTML = sim.map(vcard).join('');
      var rec = storeGet('recent', []).filter(function (id) { return id !== v.id && BYID[id]; }).slice(0, 4);
      $('#recent-sec').hidden = !rec.length;
      $('#recent').innerHTML = rec.map(function (id) { var r = BYID[id]; return '<a class="recent-item" href="vehicle.html#v' + r.id + '"><span class="photo tone-' + r.body + '">' + car(r) + '</span><span class="stack"><strong>' + title(r) + '</strong><span class="muted small num">' + money(r.price) + ' · ' + num(r.miles) + ' mi</span></span></a>'; }).join('');

      bindForms(root);
      bindGallery(v);
      $$('[data-copy]', root).forEach(function (b) { b.addEventListener('click', function () { copyText(b.dataset.copy, b.dataset.copyMsg); }); });
      $('#share-btn').addEventListener('click', function () { copyText(location.href, 'Link copied. Paste it anywhere to share.'); });
      $('#adjust-btn').addEventListener('click', function () { openCalc(v); });
      $('#history-btn').addEventListener('click', function () { openInfo('Vehicle history report', '<p class="muted">In the live site this opens the full third-party history report for VIN <strong style="color:var(--ink)">' + vin(v) + '</strong>.</p><ul class="insp-list" style="margin-top:16px"><li>' + icon('check', 20) + '<span><strong>No accidents reported</strong></span></li><li>' + icon('check', 20) + '<span><strong>' + (v.id % 3 ? 'One owner' : 'Two owners') + '</strong></span></li><li>' + icon('check', 20) + '<span><strong>Personal use</strong></span></li><li>' + icon('check', 20) + '<span><strong>Regular service history</strong></span></li></ul>'); });
      $('#report-btn').addEventListener('click', function () { openInfo('Inspection report', '<p class="muted" style="margin-bottom:16px">A summary of the checklist our technicians completed for this ' + esc(v.model) + '. The full report covers more than 150 points.</p><ul class="insp-list">' + insp.concat([['Suspension and steering', 'No play, no noises, alignment checked'], ['Body and glass', 'No rust, no chips in the windshield'], ['Air conditioning and heat', 'Both tested to spec']]).map(function (i) { return '<li>' + icon('check', 20) + '<span><strong>' + i[0] + '</strong><small>' + i[1] + '</small></span></li>'; }).join('') + '</ul>'); });
      $('#video-btn').addEventListener('click', function () { toast('Walkaround video plays here on the live site', 'play'); });
    }
    function openInfo(t, html) {
      var d = $('#info-dialog'); $('#info-title').textContent = t; $('#info-body').innerHTML = html; d.showModal();
    }
    $('#info-close').addEventListener('click', function () { $('#info-dialog').close(); });
    $('#info-dialog').addEventListener('click', function (e) { if (e.target === e.currentTarget) e.currentTarget.close(); });

    function bindGallery(v) {
      var main = $('#gal-main'), cap = $('#gal-cap'), thumbs = $('#gal-thumbs');
      function show(i, fromLb) {
        i = (i + v.photos) % v.photos; state.i = i;
        var f = frameHTML(v, i), old = main.querySelector('.frame');
        main.className = 'gal-main ' + f.tone;
        old.insertAdjacentHTML('afterend', f.html);
        var nf = old.nextElementSibling; nf.style.opacity = '0';
        requestAnimationFrame(function () { nf.style.opacity = '1'; old.style.opacity = '0'; setTimeout(function () { old.remove(); }, 300); });
        cap.textContent = (i + 1) + ' / ' + v.photos + ' · ' + f.label;
        $$('button', thumbs).forEach(function (b) { b.setAttribute('aria-current', Number(b.dataset.thumb) === i ? 'true' : 'false'); });
        var tb = thumbs.querySelector('[data-thumb="' + i + '"]');
        if (tb && thumbs.scrollTo) thumbs.scrollTo({ left: tb.offsetLeft - thumbs.clientWidth / 2 + tb.clientWidth / 2, behavior: 'smooth' });
      }
      cap.textContent = '1 / ' + v.photos + ' · ' + VIEWS[0].t;
      thumbs.addEventListener('click', function (e) { var b = e.target.closest('[data-thumb]'); if (b) show(Number(b.dataset.thumb)); });
      $$('[data-gal]', main).forEach(function (b) { b.addEventListener('click', function () { show(state.i + Number(b.dataset.gal)); }); });
      main.tabIndex = 0; main.setAttribute('aria-roledescription', 'carousel');
      main.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(state.i + 1); if (e.key === 'ArrowLeft') show(state.i - 1); });
      swipe(main, function (d) { show(state.i + d); });
      main.addEventListener('dblclick', function () { openLb(v, show); });
      $('#lb-open').addEventListener('click', function () { openLb(v, show); });
    }
    function openLb(v, syncMain) {
      var lb = document.createElement('div'); lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photos of ' + full(v));
      lb.innerHTML = '<div class="lb-top"><span id="lb-cap"></span><button type="button" aria-label="Close photos">' + icon('close', 22) + '</button></div><div class="lb-stage"><div class="frame" id="lb-frame"></div><button type="button" class="lb-nav lb-prev" aria-label="Previous photo">' + icon('left', 24) + '</button><button type="button" class="lb-nav lb-next" aria-label="Next photo">' + icon('right', 24) + '</button></div>';
      document.body.appendChild(lb); document.body.style.overflow = 'hidden';
      var i = state.i;
      function draw() { var f = frameHTML(v, i); var fr = $('#lb-frame'); fr.className = 'frame ' + f.tone; fr.innerHTML = f.html.replace(/^<div class="frame [^"]*">/, '').replace(/<\/div>$/, ''); $('#lb-cap').textContent = (i + 1) + ' / ' + v.photos + ' · ' + f.label; }
      function go(d) { i = (i + d + v.photos) % v.photos; draw(); }
      draw(); requestAnimationFrame(function () { lb.classList.add('is-open'); });
      var closeB = lb.querySelector('.lb-top button'); closeB.focus();
      function close() { lb.classList.remove('is-open'); document.body.style.overflow = ''; document.removeEventListener('keydown', key); syncMain(i); setTimeout(function () { lb.remove(); $('#lb-open').focus(); }, 250); }
      function key(e) { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); trapFocus(e, lb); }
      closeB.onclick = close; lb.querySelector('.lb-prev').onclick = function () { go(-1); }; lb.querySelector('.lb-next').onclick = function () { go(1); };
      swipe(lb.querySelector('.lb-stage'), go);
      document.addEventListener('keydown', key);
    }
    function openCalc(v) {
      var d = $('#calc-drawer');
      function upd() {
        var t = TIERS[state.tier], apr = (t[0] + t[1]) / 2, m = pay(v.price - state.down, apr, state.term);
        $('#cd-down-v').textContent = money(state.down); $('#cd-out').textContent = money(m);
        $('#cd-sum').textContent = 'per month for ' + state.term + ' months, about ' + apr.toFixed(2) + '% APR';
        $('#cd-fin').textContent = money(v.price - state.down);
        $$('[data-term]', d).forEach(function (b) { b.setAttribute('aria-pressed', Number(b.dataset.term) === state.term); });
        $('#est-line').textContent = 'Est. ' + money(m) + '/mo';
        $('#est-note-v').textContent = 'Includes our fees. Excludes taxes and registration. Estimate uses ' + money(state.down) + ' down, ' + state.term + ' months, about ' + apr.toFixed(2) + '% APR.';
      }
      $('#cd-title').textContent = 'Estimate your payment';
      $('#cd-price').textContent = money(v.price);
      var r = $('#cd-down'); r.max = Math.round(v.price * 0.5 / 500) * 500; r.value = state.down;
      r.oninput = function () { state.down = Number(r.value); upd(); };
      $$('[data-term]', d).forEach(function (b) { b.onclick = function () { state.term = Number(b.dataset.term); upd(); }; });
      var tsel = $('#cd-tier'); tsel.value = state.tier; syncSel(tsel); tsel.onchange = function () { state.tier = tsel.value; upd(); };
      upd();
      openOverlay(d);
    }
    window.addEventListener('hashchange', function () { if (/^#v\d+$/.test(location.hash)) { render(); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
    render();
  };
  function swipe(el, cb) {
    var x0 = null, y0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) cb(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  /* ---------- reserve ---------- */
  PAGES.reserve = function () {
    var m = /^#v(\d+)$/.exec(location.hash), v = (m && BYID[Number(m[1])]) || V[0];
    document.title = 'Reserve ' + title(v) + ' · Redwater Motors';
    $('#back-link').href = 'vehicle.html#v' + v.id;
    $('#sum').innerHTML = '<div class="photo photo-32 tone-' + v.body + '">' + car(v) + '</div><div class="stack" style="gap:14px;padding:22px"><div><div class="h4">' + esc(full(v)) + '</div><div class="muted small num">' + v.drive + ' · ' + num(v.miles) + ' mi · Stock ' + stock(v) + '</div></div>' +
      '<dl class="breakdown"><div><dt class="muted">Vehicle price</dt><dd>' + money(v.price) + '</dd></div><div><dt class="muted">Fees</dt><dd>Included</dd></div><div><dt class="muted">Taxes and delivery</dt><dd style="font-weight:500">Quoted next</dd></div></dl>' +
      '<div class="notice notice-ok">' + icon('shield', 20) + '<span>Submitting does not charge a card or create a binding agreement.</span></div></div>';
    $$('[data-vname]').forEach(function (el) { el.textContent = v.model; });
  };

  /* ---------- financing ---------- */
  PAGES.financing = function () {
    var TIERS = { excellent: [5.5, 7.5], good: [7.5, 10], fair: [10, 14], rebuilding: [14, 19] };
    var st = { price: 24900, down: 2500, term: 60, tier: 'good' };
    function upd() {
      var t = TIERS[st.tier], apr = (t[0] + t[1]) / 2, P = Math.max(0, st.price - st.down), m = pay(P, apr, st.term);
      $('#c-price-v').textContent = money(st.price); $('#c-down-v').textContent = money(st.down);
      $('#c-out').textContent = money(m); $('#c-sum').textContent = 'per month for ' + st.term + ' months';
      $('#c-fin').textContent = money(P); $('#c-apr').textContent = t[0] + '% to ' + t[1] + '%'; $('#c-int').textContent = money(m * st.term - P);
      $$('[data-term]').forEach(function (b) { b.setAttribute('aria-pressed', Number(b.dataset.term) === st.term); });
      var d = $('#c-down'); if (Number(d.max) !== Math.round(st.price * 0.6)) d.max = Math.round(st.price * 0.6);
    }
    $('#c-price').addEventListener('input', function (e) { st.price = Number(e.target.value); if (st.down > st.price * 0.6) { st.down = Math.round(st.price * 0.6 / 250) * 250; $('#c-down').value = st.down; } upd(); });
    $('#c-down').addEventListener('input', function (e) { st.down = Number(e.target.value); upd(); });
    $('#c-tier').addEventListener('change', function (e) { st.tier = e.target.value; upd(); });
    $$('[data-term]').forEach(function (b) { b.addEventListener('click', function () { st.term = Number(b.dataset.term); upd(); }); });
    upd();
    var vs = $('#a-vehicle'); if (vs) vs.insertAdjacentHTML('beforeend', V.slice().sort(function (a, b) { return a.make.localeCompare(b.make); }).map(function (v) { return '<option>' + esc(full(v)) + ' · ' + money(v.price) + '</option>'; }).join(''));
  };

  /* ---------- delivery ---------- */
  PAGES.delivery = function () {
    var vs = $('#q-vehicle'); if (vs) vs.insertAdjacentHTML('beforeend', V.map(function (v) { return '<option value="' + v.id + '">' + esc(full(v)) + '</option>'; }).join(''));
    $$('[data-transport]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault(); $('#q-type').value = b.dataset.transport; syncSel($('#q-type'));
        $('#quote').scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(function () { $('#q-zip').focus({ preventScroll: true }); }, 500);
      });
    });
    HOOKS.quote = function (form, ok) {
      var zip = $('#q-zip').value, type = $('#q-type').value;
      var miles = zip.indexOf('681') === 0 || zip.indexOf('680') === 0 ? 25 : { 0: 1350, 1: 1200, 2: 1120, 3: 1050, 4: 650, 5: 320, 6: 180, 7: 680, 8: 820, 9: 1520 }[zip[0]];
      var out = $('#q-estimate');
      if (type === 'pickup' || miles <= 50) out.innerHTML = 'Good news: <strong>' + zip + '</strong> is within our free local delivery area. We\'ll text you to book a day.';
      else {
        var r = type === 'enclosed' ? [1.1, 1.6] : [0.6, 1.0];
        var lo = Math.max(250, Math.round(miles * r[0] / 25) * 25), hi = Math.round(miles * r[1] / 25) * 25;
        var days = type === 'enclosed' ? [Math.ceil(miles / 300) + 2, Math.ceil(miles / 220) + 3] : [Math.ceil(miles / 350) + 1, Math.ceil(miles / 250) + 3];
        out.innerHTML = 'For about <strong class="num">' + num(miles) + ' miles</strong> to ' + zip + ' by ' + type + ' transport, expect roughly <strong class="num">' + money(lo) + ' to ' + money(hi) + '</strong> and <strong class="num">' + days[0] + ' to ' + days[1] + ' days</strong>. We\'ll confirm a fixed price within one business day.';
      }
    };
  };

  /* ---------- contact ---------- */
  PAGES.contact = function () {
    if (location.hash === '#car-search') {
      var t = $('#c-topic'); if (t) { t.value = 'Find a car for me'; syncSel(t); }
      var msg = $('#c-msg'); if (msg && !msg.value) msg.value = "I'm looking for: \nBudget: \nMust-haves: ";
    }
  };

  /* ---------- resources ---------- */
  PAGES.resources = function () {
    var items = $$('#faq details'), topic = 'all', q = '';
    function apply() {
      var shown = 0;
      items.forEach(function (d) {
        var ok = (topic === 'all' || d.dataset.topic === topic) && (!q || d.textContent.toLowerCase().indexOf(q) > -1);
        d.hidden = !ok; if (ok) shown++;
        if (q && ok) d.open = true;
      });
      $$('[data-topic-head]').forEach(function (h) { h.hidden = !items.some(function (d) { return !d.hidden && d.dataset.topic === h.dataset.topicHead; }); });
      $('#faq-empty').hidden = shown > 0;
      $('#faq-count').textContent = shown + (shown === 1 ? ' answer' : ' answers');
    }
    $('#faq-q').addEventListener('input', function (e) { q = e.target.value.trim().toLowerCase(); apply(); });
    $$('[data-topic-btn]').forEach(function (b) { b.addEventListener('click', function () { topic = b.dataset.topicBtn; $$('[data-topic-btn]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); apply(); }); });
    $$('[data-guide]').forEach(function (b) {
      b.addEventListener('click', function () {
        var tpl = document.getElementById('guide-' + b.dataset.guide), d = $('#guide-dialog');
        $('#guide-title').textContent = b.querySelector('strong').textContent;
        $('#guide-body').innerHTML = ''; $('#guide-body').appendChild(tpl.content.cloneNode(true));
        d.showModal();
      });
    });
    $('#guide-close').addEventListener('click', function () { $('#guide-dialog').close(); });
    $('#guide-dialog').addEventListener('click', function (e) { if (e.target === e.currentTarget) e.currentTarget.close(); });
    if (location.hash === '#warranty') { var w = $('[data-topic-btn="warranty"]'); if (w) w.click(); }
    apply();
  };

  /* ---------- boot ---------- */
  function boot() {
    renderHeader();
    renderFooter();
    renderMobileBar();
    bindForms(document);
    var p = PAGES[document.body.dataset.page];
    if (p) p();
    enhanceSelects(document);
    var note = $('[data-est-note]'); if (note) note.textContent = EST_NOTE;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
