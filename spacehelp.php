

<div id="help-distance" style="display:none">

<p>

This is the distance from earth to your destination. Either enter a
value or search the database for a distance to a space object by typing
the first few letters of its name. All objects in the database matching
that start with the letters you have typed will appear. Select the one
you want.  Distances are approximate because the planets&#39; positions
change continuosly relative to the earth.  If you leave distance blank,
it will be calculated --if you enter the observer time elapsed and the
traveler&#39;s maximum velocity-- using this equation:

</p>

<?php
echo(shell_exec('tail -n +2 eq1.mml'));
?>

<p>
&nbsp;&nbsp;&nbsp;where<br />
&nbsp;&nbsp;&nbsp;&nbsp;c = the speed of light,<br />
&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity,<br />
&nbsp;&nbsp;&nbsp;&nbsp;t = time elapsed in observer timeframe.
</p>

<p>

Source: <a href='http://www.mrelativity.net/MBriefs/Most%20Direct%20Derivation%20of%20Relativistic%20Constant%20Acceleration%20Distance%20Formula.htm'>

Most Direct Derivation of Relativistic Constant Acceleration Distance
Formula

</a>

</p>

</div>

<div id="help-acceleration" style="display:none">

<p>

This is the constant acceleration of the traveler&#39;s spacecraft.
Half way through the journey, the spacecraft starts decelerating
at the same rate.

</p>

<p>

If you leave the acceleration blank, it will be calculated using
Newton&#39;s laws of motion (depending on which fields have values):

</p>

<?php
echo(shell_exec('tail -n +2 eq2.mml'));
echo("<p></p>");
echo(shell_exec('tail -n +2 eq3.mml'));
echo("<p></p>");
echo(shell_exec('tail -n +2 eq4.mml'));
?>

<p>

&nbsp;&nbsp;&nbsp;where<br />
&nbsp;&nbsp;&nbsp;&nbsp;s = distance,<br />
&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity and<br />
&nbsp;&nbsp;&nbsp;&nbsp;t = time elapsed in observer timeframe

</p>

<p>

This is increasingly inaccurate as you approach the speed of light, so
for large distances, such as to the nearest stars, it is better to enter
the acceleration manually.

</p>

<p>

If a spacecraft accelerates constantly at 1g --or 9.8m/s-- the travelers
on board can experience earth-like gravity. Unfortunately interstellar
travel at this acceleration will likely never be achieved because of the
huge amount of energy required. It is not possible to travel to the
nearest stars at this acceleration if the fuel must be carried onboard
the spacecraft, no matter what kind of fuel is used.

</p>

</div>

<div id="help-max_velocity" style="display:none">

<p>

This is the maximum velocity the spacecraft will reach, from the
perspective of an observer on earth. This occurs when the spacecraft is
half way to its destination. This is calculated using this
equation:

</p>


<?php
echo(shell_exec('tail -n +2 eq5.mml'));
?>

<p>

&nbsp;&nbsp;&nbsp;where<br /> &nbsp;&nbsp;&nbsp;&nbsp;c = speed of
light,<br /> &nbsp;&nbsp;&nbsp;&nbsp;a = acceleration and<br />
&nbsp;&nbsp;&nbsp;&nbsp;t = time elapsed to end of journey in observer
timeframe.

</p>

<p>
Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky
This Week</a>.
</p>

</div>

<div id="help-observer_time" style="display:none">

<p>

This is the time elapsed for the whole journey from the observer on
earth&#39;s time frame. This is calculated using this equation:

</p>

<?php
echo(shell_exec('tail -n +2 eq6.mml'));
?>

<p>

&nbsp;&nbsp;&nbsp;where<br />
&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light,<br />
&nbsp;&nbsp;&nbsp;&nbsp;d = distance of the journey and<br />
&nbsp;&nbsp;&nbsp;&nbsp;a = acceleration.

</p>

<p>
Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky
This Week</a>.

</p>

</div>

<div id="help-traveler_time" style="display:none">

<p>

This is the time elapsed for the whole journey from the perspective of
the spacecraft.  This is calculated using this equation:

</p>

<?php
echo(shell_exec('tail -n +2 eq7.mml'));
?>

<p>

&nbsp;&nbsp;&nbsp;where<br />
&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light,<br />
&nbsp;&nbsp;&nbsp;&nbsp;d = distance of the journey and<br />
&nbsp;&nbsp;&nbsp;&nbsp;a = acceleration.

</p>

<p>

Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky
This Week</a>.

</p>

</div>

<div id="help-spacecraft_mass" style="display:none">

<p>

This is the mass of the spacecraft excluding its fuel. The default value of
25,000kg is approximately the <a href="http://www.esa.int/Our_Activities/Human_Spaceflight/Space_Shuttle/Shuttle_technical_facts">maximum payload of the Endeavour space shuttle</a>.

</p>

<p>

Note that if this field is blanked out it is not calculated.
This field must have a value if you want energy and
fuel mass to be calculated.

</p>

<p>

Also note that if the fuel mass is calculated to be more than the
mass of your spacecraft, then your trip cannot be done unless you
extract fuel from space. If your fuel mass is more than half the mass of
your spacecraft, you&#39;re probably on a one way trip, so take enough food,
books and episodes of Star Trek to last the rest of your life.

</p>

</div>


<div id="help-energy" style="display:none">

<p>

This is the amount of energy your spacecraft's payload will need to constantly
accelerate to half way to your destination and then decelerate at the
same rate until you reach your destination. This is calculated using
this equation:

</p>

<?php
echo(shell_exec('tail -n +2 eq8.mml'));
?>

<p>

&nbsp;&nbsp;&nbsp;where<br />
&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light,<br />
&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity and<br />
&nbsp;&nbsp;&nbsp;&nbsp;m = spacecraft mass.

</p>

<p>

Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky This Week</a>.

</p>

</div>


<div id="help-fuel_conversion_rate" style="display:none">

<p>

The fuel conversion rate is the the efficiency with which your
spacecraft&#39;s fuel is converted into energy. At today&#39;s fuel
conversion rates there is no prospect of sending a spacecraft to another
star in a reasonable period of time. Advances in technologies such as
nuclear fusion are needed first.

</p>

<p>

The default fuel conversion rate of 0.008 is for hydrogen into helium
fusion. David Oesper explains that this rate assumes 100% of the fuel
goes into propelling the spacecraft, but there will be energy losses
which will require a greater amount of fuel than this.</p>

<p>

If you leave this field blank but enter the fuel mass, it is calculated by
dividing the given fuel mass by what the fuel mass would be if it were perfectly
efficient (i.e. a conversion rate of 1.0).

<p>

&nbsp;&nbsp;&nbsp;&nbsp;e = energy,<br /> &nbsp;&nbsp;&nbsp;&nbsp;m = fuel mass
and<br /> &nbsp;&nbsp;&nbsp;&nbsp;c = speed of light.

</p>

Source: <a href='http://www.skythisweek.info/constant1g.pdf'>The Sky
This Week</a>.

</p>

</div>

<div id="help-fuel_mass" style="display:none;">

<p>

This is the mass of the fuel needed to for your journey.
This is calculated using this equation:

</p>

<?php
echo(shell_exec('tail -n +2 eq10.mml'));
?>

<p>
&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity and<br />
&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light.
</p>

<p>
Source: <a href="http://math.ucr.edu/home/baez/physics/Relativity/SR/Rocket/rocket.html">The Relativistic Rocket</a> and <a href='http://physics.stackexchange.com/a/259268'>Physics Stack
    Exchange.</a> (Thanks to users user2096078,
    Qmechanic and udrv. Also thanks to John F for informing me of a bug that has
    now hopefully been corrected.)
</p>

</div>

<div id="help-traveler_length" style="display:none;">

<p>

This is the length of the spacecraft at the beginning of the journey.
Note that the spacecraft length always stays the same for the people in it.
This is calculated using this equation:

</p>

<?php
echo(shell_exec('tail -n +2 eq11.mml'));
?>

<p>

&nbsp;&nbsp;&nbsp;where<br />
&nbsp;&nbsp;&nbsp;&nbsp;l = length of traveler from observer&#39;s perspective,<br />
&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity of traveler and<br />
&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light.

</p>

<p>

Source: <a href='http://hyperphysics.phy-astr.gsu.edu/hbase/relativ/tdil.html'>Hyperphysics</a>.

</p>

</div>

<div id="help-observer_length" style="display:none;">

<p>

This is the length of the spacecraft from the observer on earth&#39;s
perspective. Of course spacecrafts are small, so it would be impossible
to see a spacecraft from earth on an interstellar voyage. This is
calculated using this equation: </p>

<?php
echo(shell_exec('tail -n +2 eq12.mml'));
?>

<p>

&nbsp;&nbsp;&nbsp;where<br />
&nbsp;&nbsp;&nbsp;&nbsp;l<sub>0</sub> = original length of spacecraft on earth,<br />
&nbsp;&nbsp;&nbsp;&nbsp;v = maximum velocity of traveler and<br />
&nbsp;&nbsp;&nbsp;&nbsp;c = speed of light.

</p>

<p>

Source: <a href='http://hyperphysics.phy-astr.gsu.edu/hbase/relativ/tdil.html'>Hyperphysics</a>.

</p>

</div>
