document.addEventListener('DOMContentLoaded', function () {

    const container =
        document.getElementById('countdownContainer');

    if (!container || typeof events === 'undefined') {
        return;
    }

    function startCountdown() {

        let nearestDate = null;
        let nearestEvent = null;

        const now = new Date();

        for (const date in events) {

            const eventDate = new Date(date);
            const diff = eventDate - now;

            const sevenDays =
                7 * 24 * 60 * 60 * 1000;

            if (
                diff > 0 &&
                diff <= sevenDays
            ) {
                if (
                    nearestDate === null ||
                    eventDate < nearestDate
                ) {
                    nearestDate = eventDate;
                    nearestEvent = events[date];
                }
            }
        }

        if (!nearestDate) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';

        document.getElementById('eventTitle')
            .innerHTML =
            nearestEvent.title;

        document.getElementById('eventInfo')
            .innerHTML =
            nearestDate.toLocaleDateString() +
            ' • ' +
            nearestEvent.venue;

        function updateCountdown() {

            const distance =
                nearestDate - new Date();

            if (distance <= 0) {
                container.style.display = 'none';
                clearInterval(timer);
                return;
            }

            const days =
                Math.floor(
                    distance /
                    (1000 * 60 * 60 * 24)
                );

            const hours =
                Math.floor(
                    (distance %
                        (1000 * 60 * 60 * 24)) /
                    (1000 * 60 * 60)
                );

            const minutes =
                Math.floor(
                    (distance %
                        (1000 * 60 * 60)) /
                    (1000 * 60)
                );

            const seconds =
                Math.floor(
                    (distance %
                        (1000 * 60)) /
                    1000
                );

            document.getElementById('days').innerHTML =
                String(days).padStart(2, '0');

            document.getElementById('hours').innerHTML =
                String(hours).padStart(2, '0');

            document.getElementById('minutes').innerHTML =
                String(minutes).padStart(2, '0');

            document.getElementById('seconds').innerHTML =
                String(seconds).padStart(2, '0');
        }

        updateCountdown();
        const timer =
            setInterval(updateCountdown, 1000);
    }

    startCountdown();
});
