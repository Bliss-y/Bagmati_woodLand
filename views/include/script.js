{
	const testFile = import('../../server/controller/TestFile')
	var addStudents;
	var addCourses;
	var addModule;

	function load() {
		addStudents = document.getElementById("addStudents");
		addCourses = document.getElementById("addCourses");
		addModule = document.getElementById("addModules");

		addStudents.addEventListener('click', () => testFile.addDummyStudents(3));
		addCourses.addEventListener('click', () => testFile.addDummyCourses(3));
		addModule.addEventListener('click', () => testFile.addModulesForAllCourses(3));

	}





	document.addEventListener('DOMContentLoaded', load);
}