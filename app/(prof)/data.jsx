const Event = ({
  name,
  group_runner,
  publish = false,
  is_finish = false,
  description,
  location
}) => {
  events[name] = {
    group_runner,
    publish,
    is_finish,
    description,
    location
  };
};

let events = {};
let groups = ['Group 1', 'Group 2'];
let maps = {};

export { Event, events, groups, maps };
