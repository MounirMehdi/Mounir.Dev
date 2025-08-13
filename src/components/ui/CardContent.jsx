import CardContent from './CardContent';

// Dans votre composant Projects
{filteredProjects.map((project) => (
  <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div className="relative overflow-hidden">
      {/* Image du projet */}
    </div>
    <CardContent 
      project={project} 
      onClick={() => setSelectedProject(project)} 
    />
  </Card>
))}