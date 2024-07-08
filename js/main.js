(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('.back-to-top').css('display', 'block').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow', function () {
                $(this).css('display', 'none');
            });
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

    // Toggle review form visibility
    $('#toggleReviewFormBtn').click(function () {
        $('#reviewFormContainer').toggleClass('d-none');
    });

    // Handle review form submission
    $('#reviewForm').submit(function (event) {
        event.preventDefault();
        var reviewText = $('#reviewText').val();
        var reviewerName = $('#reviewerName').val();

        // Simulating form submission (replace with actual submission logic)
        console.log('Review Text:', reviewText);
        console.log('Reviewer Name:', reviewerName);

        // Show thank you modal after form submission
        $('#thankYouModal').modal('show');

        // Optionally, reset form and hide after submission
        $('#reviewText').val('');
        $('#reviewerName').val('');
        $('#reviewFormContainer').addClass('d-none');
    });

    // Handle newsletter form submission
    $('#submitNewsletterBtn').click(function () {
        var email = $('#emailInput').val().trim();

        // Basic email validation using regex
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate newsletter subscription (replace with actual submission logic)
        console.log('Subscribed email:', email);

        // Display confirmation message in green color
        $('#newsletterMsg')
            .css('color', 'green')
            .fadeIn('fast')
            .text('Thank you for subscribing!');

        // Optionally, reset the form after submission
        $('#emailInput').val('');

        // Hide message after 3 seconds (optional)
        setTimeout(function () {
            $('#newsletterMsg').fadeOut('fast');
        }, 3000);
    });

})(jQuery);

document.addEventListener('DOMContentLoaded', async function () {
    const headerContainers = document.querySelectorAll(".header");
    const footerContainers = document.querySelectorAll(".footer");

    async function loadHeader(container) {
        try {
            const response = await fetch("./header.html");
            const data = await response.text();
            container.innerHTML = data;
        } catch (error) {
            console.error("Error loading header:", error);
        }
    }

    async function loadFooter(container) {
        try {
            const response = await fetch("./footer.html");
            const data = await response.text();
            container.innerHTML = data;
        } catch (error) {
            console.error("Error loading footer:", error);
        }
    }

    // Load headers and footers and wait for them to finish loading
    await Promise.all(Array.from(headerContainers).map(container => loadHeader(container)));
    await Promise.all(Array.from(footerContainers).map(container => loadFooter(container)));

    // Highlight active navbar link based on current page
    function highlightActiveNavLink() {
        // Select all nav links
        const navItems = document.querySelectorAll('.nav-item.nav-link');
        const currentPath = window.location.pathname.toLowerCase();
        navItems.forEach(item => {
            const href = item.getAttribute('href').toLowerCase();
    
            // If the currentPath is '/', we explicitly match it with index.html
            if ((currentPath === '/' && href === 'index.html') || currentPath.includes(href)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    

    highlightActiveNavLink();
});

