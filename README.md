# Processing, Please Wait Message with Animated Spinner
Implements a please wait message with dismiss link and animation to Sage CRM 7.3+

Sage CRM does not very often let your users know that it is actually processing data. When there is nothing visually displayed the only way of telling is to enable the status bar in the browser and then hover your mouse pointer over it. When busy an hour glass will appear next to the mouse pointer. This indicates that the system is still processing data and that your browser has not frozen.

I thought that was not a very smooth user experience and must cause some fraustration too. So, I developed this animated spinner which can be implemented into your Sage CRM system easily.

**Please Note: -**  Due to their being multitudes of different upgrades and patches out there. It would not be possible for me to test this code out on every combination. I have tested this on Sage CRM 7.3+ though. If it does have adverse side effects then all you have to do is remove the file from the **/js/custom/** directory. 

<img src="https://github.com/julianmummery/sagecrm-please-wait-animation/blob/master/SageCRM-Loading-Anim.png">

<video width="480" height="320" controls="controls">
  <source src="SageCRM-Loading-Anim.mp4" type="video/mp4">
</video>


# How to Implement

1)  Login to the Sage CRM Server with local administrative privilages

2)  Download the two JavaScript files and also the entire isloading directory and place them where shown in **Image #1** below: -

    **<h5>Image #1</h5>**
    <img src="https://github.com/julianmummery/sagecrm-please-wait-animation/blob/master/SageCRM-Loading-Anim-Files.png">

    **Please Note: -** The filenames are prefixed with the letter **'z'** to ensure that when Sage CRM loads it's libraries alphabetically it will get to our custom .JS files last. When extending any platform you would be wise to treat the core systems files as a dependency, so by loading it at the end we mitigate any risk of browser loading syntax errors!  

 3)  In order to make the changes take effect, all users must logout of Sage CRM and then log back in again
 
     **Please note: -** By making changes to the JavaScript file and if it is already running in a LIVE environment. Users may also have to clear their browser **cache**

<hr />

If you would like to take a look at my other Projects / Examples please use the following link: -
<a alt="Julian Mummery's Portfolio" href="https://julianmummery.github.io">https://julianmummery.github.io</a>
