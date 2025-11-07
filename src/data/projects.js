import cseProjects from './cse.json';
import eeeProjects from './eee.json';
import matlabProjects from './matlab.json';

const annotateWithSource = (projects, sourceCategory) =>
  projects.map((project) => ({
    ...project,
    _sourceCategory: sourceCategory
  }));

const projects = [
  ...annotateWithSource(eeeProjects, 'EEE'),
  ...annotateWithSource(matlabProjects, 'MATLAB'),
  ...annotateWithSource(cseProjects, 'CSE')
];

export default projects;
export { annotateWithSource };
