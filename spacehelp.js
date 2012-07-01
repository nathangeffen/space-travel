var HelpText = {};

HelpText['distance'] = 
    "This is the distance from earth to your destination. To get the " +
    "distance to a space object, search for it " + 
    "by typing its name. Distances are approximate because the " +
    "planets' positions change continuosly relative to the earth. " +
    "If you leave distance blank, it will be calculated --if you enter " +
    "the observer time elapsed and the traveler's maximum velocity-- using this " +
    "equation: <br/ >&nbsp;&nbsp;&nbsp;cvt / (c + sqrt(c^2-v^2))<br /> " + 
    "&nbsp;&nbsp;&nbsp;where<br /> " +
    "&nbsp;&nbsp;&nbsp;&nbsp;c = the speed of light,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;t = time elapsed in observer timeframe.<br />"+
    "Source: <a href='http://www.mrelativity.net/MBriefs/Most%20Direct%20Derivation%20of%20Relativistic%20Constant%20Acceleration%20Distance%20Formula.htm'>" +
    "Most Direct Derivation of Relativistic Constant Acceleration Distance Formula"+
    "</a>.";

HelpText['acceleration'] =
    "This is the constant acceleration of the traveler's spacecraft. "+
    "Half way through the journey, the spacecraft starts decelerating "+
    "at the same rate. <br />" +
    "If you leave the acceleration blank, it will be calculated " +
    "using Newton's laws of motion (depending on which fields have values): <br />" +
    "&nbsp;&nbsp;&nbsp;a = s/(t^2/4) or<br />" +
    "&nbsp;&nbsp;&nbsp;a = v^2/s or<br />" +
    "&nbsp;&nbsp;&nbsp;a = 2*v/t<br /> " +
    "&nbsp;&nbsp;&nbsp;where<br /> " +
    "&nbsp;&nbsp;&nbsp;&nbsp;s = distance,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity and<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;t = time elapsed in observer timeframe<br />" +
    "This is increasingly inaccurate " +
    "as you approach the speed of light, so for large distances, " +
    "such as to the nearest stars, it is better to enter the " +
    "acceleration manually.<br />"+
    "If a spacecraft accelerates constantly at 1g --or 9.8m/s-- it can "+
    "the travelers on board can experience earth-like gravity. " + 
    "Unfortunately interstellar travel at this acceleration will " +
    "likely never be achieved because of the huge amount of " +
    "energy required. It is not even theoretically possible to " +
    "travel to the nearest stars at this acceleration if the fuel  " +
    "must be carried onboard the spacecraft.";

HelpText["max_velocity"] = "This is the maximum velocity the " +
    "spacecraft will reach, from the perspective of an observer "+
    "on earth. This occurs when the spacecraft is half way " +
    "to its destination. <br />" +
    "This is calculated using this equation: <br />" +
    "&nbsp;&nbsp;&nbsp;v = c / sqrt(1 + (c^2/a^2)*1/(t^2/4))" +
    "&nbsp;&nbsp;&nbsp;where<br /> " +
    "&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;a = acceleration and<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;t = time elapsed to end of journey "+
    "in observer timeframe. <br />"+
    "Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky This Week</a>.";

HelpText["observer_time"] = "This is the time elapsed for the whole "+
    "journey from the observer on earth's perspective. " +
    "This is calculated using this equation: <br />" +
    "&nbsp;&nbsp;&nbsp;t = 2*sqrt(c^2/^2*[(d/(2*c^2/a^2)+1)^2-1])" +
    "&nbsp;&nbsp;&nbsp;where<br /> " +
    "&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;d = distance of the journey and<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;a = acceleration.<br />"+
    "Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky This Week</a>.";

HelpText["traveler_time"] = "This is the time elapsed for the whole " +
    "journey from the perspective of the spacecraft. " +
    "This is calculated using this equation: <br />" +
    "&nbsp;&nbsp;&nbsp;t = (2c/a) * acosh(d/(2*c^2/a^2)+1)" +
    "&nbsp;&nbsp;&nbsp;where<br /> " +
    "&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;d = distance of the journey and<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;a = acceleration.<br />"+
    "Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky This Week</a>.";

HelpText["spacecraft_mass"] = "This is the total mass of the " +
    "spacecraft and its contents including fuel. The default value "+
    "of 110,000kg is the mass of the space shuttle Endeavour when it "+
    "takes off (the orbiter only). This is not calculated; you must "+
    "enter the mass if you want energy and fuel mass to be "+
    "calculated. Note that if the fuel mass is calculated to be more "+
    "than the mass of your spacecraft, then your trip cannot be " +
    "done unless you extract fuel from space. If your fuel mass is "+
    "more than half the mass of your spacecraft, you're probably on"+
    "a one way trip, so take enough food, books and episodes of "
    "Star Trek to last the rest of your life.";

HelpText["energy"] = "This is the amount of energy your spacecraft "+
    "will need to constantly accelerate to half way to your " +
    "destination and then decelerate at the same rate until you " +
    "reach your destination. <br />"
    "This is calculated using this equation: <br />" +
    "&nbsp;&nbsp;&nbsp;e = 2mc^2 * [ 1 / sqrt(1-v^2/c^2) -1 ]" +
    "&nbsp;&nbsp;&nbsp;where<br /> " +
    "&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity and<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;m = spacecraft mass.<br />"+
    "Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky This Week</a>.";

HelpText["fuel_conversion_rate"] = "The fuel conversion rate is the " +
    "the efficiency with which your spacecraft's fuel is converted " +
    "into energy. At today's fuel conversion rates there is " +
    "no prospect of sending a spacecraft to another star in a "+
    "reasonable period of time. Advances in technologies such as "+
    "nuclear fusion are needed first.<br />" +
    "The default fuel conversion rate of 0.008 is for hydrogen into "+
    "helium fusion. David Oesper explains that this rate assumes "+
    "100% of the fuel goes into propelling the spacecraft, but "+
    "there will be energy losses which will require a greater "+
    "amount of fuel than this.<br />"
    "This is calculated using this equation: <br />" +
    "&nbsp;&nbsp;&nbsp;r = e / mc^2" +
    "&nbsp;&nbsp;&nbsp;where<br /> " +
    "&nbsp;&nbsp;&nbsp;&nbsp;e = energy,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;m = fuel mass and<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light.<br />"+
    "Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky This Week</a>.";


HelpText["fuel_mass"] = "This is the mass of the fuel needed to "+
    "fuel your spacecraft's journey. " +
    "This is calculated using this equation: <br />" +
    "&nbsp;&nbsp;&nbsp;m = e / r * c^2" +
    "&nbsp;&nbsp;&nbsp;where<br /> " +
    "&nbsp;&nbsp;&nbsp;&nbsp;e = energy,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;r = fuel conversion rate and<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light.<br />"+
    "Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky This Week</a>.";

HelpText["traveler_length"] = "This is the length of the spacecraft "+
    "from the traveler's perspective when it reaches its "+
    "maximum velocity relative to an observer on earth. " +
    "This doesn't change during the "+
    "journey; the spacecraft length always stays the same for the ."+
    "people in it. <br />" +
    "This is calculated using this equation: <br />" +
    "&nbsp;&nbsp;&nbsp;l0 = l / sqrt(1 - v^2/c^2)" +
    "&nbsp;&nbsp;&nbsp;where<br /> " + 
    "&nbsp;&nbsp;&nbsp;&nbsp;l = length of traveler from observer's perspective,<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity of traveler and<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light.<br />"+
    "Source: <a href='http://hyperphysics.phy-astr.gsu.edu/hbase/relativ/tdil.html'>Hyperphysics</a>.";

HelpText["observer_length"] = "This is the length of the spacecraft "+
    "from the observer on earth's perspective. Of course spacecrafts "+
    "are small, so it would be impossible to see a spacecraft from "+
    "earth on an interstellar voyage.<br />"
    "This is calculated using this equation: <br />" +
    "&nbsp;&nbsp;&nbsp;l = l0 * sqrt(1 - v^2/c^2)" +
    "&nbsp;&nbsp;&nbsp;where<br /> " + 
    "&nbsp;&nbsp;&nbsp;&nbsp;l0 = original length of spacecraft on earth,<br />"
    "&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity of traveler and<br />" +
    "&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light.<br />"+
    "Source: <a href='http://hyperphysics.phy-astr.gsu.edu/hbase/relativ/tdil.html'>Hyperphysics</a>.";
