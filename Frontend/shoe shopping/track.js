document.addEventListener('DOMContentLoaded', function() {
    // Get all track buttons
    const trackButtons = document.querySelectorAll('.track-btn');
    const modal = document.getElementById('trackingModal');
    const closeModal = document.querySelector('.close-modal');
    const modalOrderNumber = document.getElementById('modalOrderNumber');
    const modalTrackingId = document.getElementById('modalTrackingId');
    const trackingProgress = document.getElementById('trackingProgress');

    // Sample tracking data for each order
    const trackingData = {
        '12345': {
            trackingId: 'TRK12345678',
            status: 'shipped',
            steps: [
                { 
                    status: 'Order Placed', 
                    date: '2023-05-01 10:30 AM',
                    completed: true
                },
                { 
                    status: 'Processing', 
                    date: '2023-05-02 09:15 AM',
                    completed: true
                },
                { 
                    status: 'Shipped', 
                    date: '2023-05-03 02:45 PM',
                    completed: true,
                    active: true
                },
                { 
                    status: 'In Transit', 
                    date: 'Estimated: 2023-05-05',
                    completed: false
                },
                { 
                    status: 'Delivered', 
                    date: 'Estimated: 2023-05-07',
                    completed: false
                }
            ]
        },
        '12346': {
            trackingId: 'TRK87654321',
            status: 'delivered',
            steps: [
                { 
                    status: 'Order Placed', 
                    date: '2023-05-03 11:20 AM',
                    completed: true
                },
                { 
                    status: 'Processing', 
                    date: '2023-05-04 10:00 AM',
                    completed: true
                },
                { 
                    status: 'Shipped', 
                    date: '2023-05-05 03:30 PM',
                    completed: true
                },
                { 
                    status: 'In Transit', 
                    date: '2023-05-06 08:15 AM',
                    completed: true
                },
                { 
                    status: 'Delivered', 
                    date: '2023-05-07 01:45 PM',
                    completed: true,
                    active: true
                }
            ]
        },
        '12347': {
            trackingId: 'TRK11223344',
            status: 'processing',
            steps: [
                { 
                    status: 'Order Placed', 
                    date: '2023-05-10 02:15 PM',
                    completed: true,
                    active: true
                },
                { 
                    status: 'Processing', 
                    date: 'Estimated: 2023-05-11',
                    completed: false
                },
                { 
                    status: 'Shipped', 
                    date: 'Estimated: 2023-05-13',
                    completed: false
                },
                { 
                    status: 'In Transit', 
                    date: 'Estimated: 2023-05-15',
                    completed: false
                },
                { 
                    status: 'Delivered', 
                    date: 'Estimated: 2023-05-17',
                    completed: false
                }
            ]
        }
    };

    // Add click event to each track button
    trackButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const orderNumber = this.getAttribute('data-order');
            const orderData = trackingData[orderNumber];
            
            // Update modal content
            modalOrderNumber.textContent = orderNumber;
            modalTrackingId.textContent = orderData.trackingId;
            
            // Generate tracking progress steps
            trackingProgress.innerHTML = '';
            orderData.steps.forEach(step => {
                const stepElement = document.createElement('div');
                stepElement.className = `tracking-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`;
                stepElement.innerHTML = `
                    <h4>${step.status}</h4>
                    <p class="tracking-date">${step.date}</p>
                `;
                trackingProgress.appendChild(stepElement);
            });
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});