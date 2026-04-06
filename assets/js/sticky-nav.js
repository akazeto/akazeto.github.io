const stickyNav = document.getElementById('sticky-nav');
const navOffset = stickyNav.offsetHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY >= navOffset) {
        stickyNav.classList.add('fixed');
        // nav 높이만큼 아래 콘텐츠 밀리지 않게
        document.body.style.paddingTop = stickyNav.offsetHeight + 'px';
    } else {
        stickyNav.classList.remove('fixed');
        document.body.style.paddingTop = '0';
    }
});