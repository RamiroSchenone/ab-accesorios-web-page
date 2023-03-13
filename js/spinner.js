const show = (object) => {
    object.classList.remove('hidden');
    object.classList.remove('d-none');
    object.classList.add('show');
};

const hidden = (object) => {
    object.classList.remove('show');
    object.classList.add('hidden');
    object.classList.add('d-none');
};