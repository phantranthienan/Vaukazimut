const MAP_STYLE = [
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
];

const INSA_CVL = {
    latitude: 47.08219664050904,
    longitude: 2.415588268996861,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
};

const LAC_DAURON = {
    latitude: 47.05503872943615, 
    longitude: 2.3959234164165344,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
}

const STADE_JUSTICE = {
    latitude: 47.059475694706684, 
    longitude: 2.4215227072978043,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
}

const CREPS = {
    latitude: 47.10711983739351, 
    longitude: 2.4204758915249434,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
}

export { MAP_STYLE, INSA_CVL, LAC_DAURON, STADE_JUSTICE, CREPS};