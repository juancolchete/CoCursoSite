export interface Course {
  id: string
  title: string
  description: string
  category: string
  duration: string
  students: number
  rating: number
  progress: number
  status: string
  image: string
  totalWeeks: number
  completedWeeks: number
  weeks: Week[]
  tags: string[] // Adicionar tags
}

export interface Week {
  id: number
  title: string
  completed: boolean
  current?: boolean
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
  videoUrl?: string
  materials: Material[]
}

export interface Material {
  title: string
  type: "pdf" | "link" | "document"
  url: string
}

export async function fetchCourses(): Promise<Course[]> {
  try {
    const response = await fetch("https://raw.githubusercontent.com/ColcheteDAO/cocurso/refs/heads/main/courses.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    console.log("=== RAW JSON DATA ===")
    console.log(JSON.stringify(data, null, 2))

    // Handle different possible JSON structures
    let coursesArray: any[] = []

    if (Array.isArray(data)) {
      coursesArray = data
      console.log("Data is direct array")
    } else if (data.courses && Array.isArray(data.courses)) {
      coursesArray = data.courses
      console.log("Data has courses property")
    } else if (data && typeof data === "object") {
      const possibleArrays = Object.values(data).filter(Array.isArray)
      if (possibleArrays.length > 0) {
        coursesArray = possibleArrays[0] as any[]
        console.log("Found array in object values")
      }
    }

    console.log("=== COURSES ARRAY ===")
    console.log(JSON.stringify(coursesArray, null, 2))

    if (!Array.isArray(coursesArray) || coursesArray.length === 0) {
      console.warn("No courses array found in data")
      return []
    }

    // Transform ONLY the data that exists in the JSON
    return coursesArray
      .map((course: any, index: number) => {
        console.log(`=== PROCESSING COURSE ${index} ===`)
        console.log("Course data:", JSON.stringify(course, null, 2))

        // Buscar conteúdo em todas as possíveis propriedades
        const possibleContent = [
          course.modules,
          course.weeks,
          course.content,
          course.lessons,
          course.sections,
          course.chapters,
        ].find((content) => Array.isArray(content) && content.length > 0)

        console.log("Found content:", possibleContent)

        // Calcular quantidade de semanas baseado no tamanho do array modules
        const totalWeeksFromModules = course.modules && Array.isArray(course.modules) ? course.modules.length : 0
        const totalWeeksCalculated =
          course.totalWeeks || totalWeeksFromModules || (possibleContent ? possibleContent.length : 0)

        // Extrair tags do JSON
        const courseTags = course.tags && Array.isArray(course.tags) ? course.tags : []

        console.log(`Course ${index} - Total weeks calculated: ${totalWeeksCalculated}`)
        console.log(`Course ${index} - Tags found:`, courseTags)

        // Gerar dados mockados para avaliação e alunos
        const mockRating = 4.5 + Math.random() * 0.4 // Entre 4.5 e 4.9
        const mockStudents = Math.floor(Math.random() * 2000) + 500 // Entre 500 e 2500

        const transformedCourse = {
          id: course.id || `course-${index}`,
          title: course.title || course.name || "",
          description: course.description || course.desc || "",
          category: course.category || course.type || "",
          duration: course.duration || `${totalWeeksCalculated} semanas`,
          students: mockStudents,
          rating: Number(mockRating.toFixed(1)),
          progress: course.progress || 0,
          status:
            course.status ||
            (course.progress > 0 ? (course.progress === 100 ? "Concluído" : "Em andamento") : "Não iniciado"),
          image: course.image || "",
          totalWeeks: totalWeeksCalculated,
          completedWeeks: course.completedWeeks || 0,
          weeks: transformWeeksData(possibleContent || []),
          tags: courseTags,
        }

        console.log("Transformed course:", JSON.stringify(transformedCourse, null, 2))
        return transformedCourse
      })
      .filter((course) => course.title) // Only return courses that have at least a title
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}

function transformWeeksData(contentData: any[]): Week[] {
  console.log("=== TRANSFORMING WEEKS DATA ===")
  console.log("Input data:", JSON.stringify(contentData, null, 2))

  if (!Array.isArray(contentData) || contentData.length === 0) {
    console.log("No content data found")
    return []
  }

  const transformedWeeks = contentData
    .map((item: any, index: number) => {
      console.log(`Processing week/module ${index}:`, JSON.stringify(item, null, 2))

      // Buscar lessons/submodules em todas as possíveis propriedades
      const possibleLessons = [
        item.submodules, // PRIORIDADE para submodules
        item.lessons,
        item.classes,
        item.videos,
        item.content,
        item.modules,
        item.topics,
        item.items,
      ].find((lessons) => Array.isArray(lessons) && lessons.length > 0)

      console.log(`Found lessons/submodules for week ${index}:`, possibleLessons)

      const week = {
        id: item.id || index + 1,
        title: item.title || item.name || item.topic || "",
        completed: item.completed || false,
        current: item.current || false,
        lessons: transformLessonsData(possibleLessons || [], `week-${index}`),
      }

      console.log(`Transformed week ${index}:`, JSON.stringify(week, null, 2))
      return week
    })
    .filter((week) => week.title) // Only return weeks that have a title

  console.log("=== FINAL TRANSFORMED WEEKS ===")
  console.log(JSON.stringify(transformedWeeks, null, 2))

  return transformedWeeks
}

function transformLessonsData(lessonsData: any[], context = ""): Lesson[] {
  console.log(`=== TRANSFORMING LESSONS DATA (${context}) ===`)
  console.log("Input lessons:", JSON.stringify(lessonsData, null, 2))

  if (!Array.isArray(lessonsData) || lessonsData.length === 0) {
    console.log("No lessons data found")
    return []
  }

  const transformedLessons = lessonsData
    .map((submodule: any, index: number) => {
      console.log(`Processing submodule ${index}:`, JSON.stringify(submodule, null, 2))

      // ESPECÍFICO: Acessar submodule.material[] com estrutura {kind, title, value}
      let materials: Material[] = []

      console.log(`=== CHECKING MATERIALS FOR SUBMODULE ${index} ===`)
      console.log(`submodule.material exists:`, !!submodule.material)
      console.log(`submodule.material is array:`, Array.isArray(submodule.material))

      if (submodule.material && Array.isArray(submodule.material)) {
        console.log(`✅ Found submodule[${index}].material:`, JSON.stringify(submodule.material, null, 2))

        // Verificar se tem a estrutura {kind, title, value}
        const firstMaterial = submodule.material[0]
        if (firstMaterial && typeof firstMaterial === "object") {
          console.log(`First material structure:`, Object.keys(firstMaterial))
          console.log(`Has kind:`, !!firstMaterial.kind)
          console.log(`Has title:`, !!firstMaterial.title)
          console.log(`Has value:`, !!firstMaterial.value)
        }

        materials = transformMaterialsData(submodule.material, `submodule-${index}`)
      } else {
        console.log(`❌ No materials found in submodule[${index}].material`)

        // Log todas as propriedades do submodule para debug
        console.log(`Available properties in submodule[${index}]:`, Object.keys(submodule))

        // Fallback para outras possíveis propriedades
        const possibleMaterials = [
          submodule.materials,
          submodule.resources,
          submodule.files,
          submodule.attachments,
          submodule.downloads,
        ].find((materials) => Array.isArray(materials) && materials.length > 0)

        if (possibleMaterials) {
          console.log(`Found materials in fallback property:`, possibleMaterials)
          materials = transformMaterialsData(possibleMaterials, `submodule-${index}-fallback`)
        }
      }

      const transformedLesson = {
        id: submodule.id || `lesson-${index + 1}`,
        title: submodule.title || submodule.name || submodule.topic || submodule.subject || "",
        duration: submodule.duration || submodule.time || submodule.length || "",
        completed: submodule.completed || submodule.finished || false,
        videoUrl: submodule.videoUrl || submodule.video || submodule.url || submodule.link || "",
        materials: materials,
      }

      console.log(`✅ Transformed submodule ${index}:`)
      console.log(`   - Title: ${transformedLesson.title}`)
      console.log(`   - Materials count: ${materials.length}`)
      console.log(`   - Materials:`, materials)
      console.log(`   - Full lesson:`, JSON.stringify(transformedLesson, null, 2))

      return transformedLesson
    })
    .filter((lesson) => lesson.title) // Only return lessons that have a title

  console.log("=== FINAL TRANSFORMED LESSONS ===")
  console.log(`Total lessons: ${transformedLessons.length}`)
  console.log(
    `Total materials across all lessons: ${transformedLessons.reduce((acc, lesson) => acc + lesson.materials.length, 0)}`,
  )
  console.log(JSON.stringify(transformedLessons, null, 2))

  return transformedLessons
}

function transformMaterialsData(materialsData: any[], context = ""): Material[] {
  console.log(`=== TRANSFORMING MATERIALS DATA (${context}) ===`)
  console.log("Input materials:", JSON.stringify(materialsData, null, 2))

  if (!Array.isArray(materialsData) || materialsData.length === 0) {
    console.log("No materials data found")
    return []
  }

  const transformedMaterials = materialsData
    .map((material: any, index: number) => {
      console.log(`Processing material ${index} in ${context}:`, JSON.stringify(material, null, 2))

      // ESPECÍFICO: Estrutura {kind, title, value}
      let materialType: "pdf" | "link" | "document" = "document"
      let materialTitle = ""
      let materialUrl = ""

      // Usar 'kind' para determinar o tipo
      if (material.kind) {
        const kind = material.kind.toLowerCase()
        if (kind === "pdf") {
          materialType = "pdf"
        } else if (kind === "link") {
          materialType = "link"
        } else {
          materialType = "document"
        }
        console.log(`Material type from kind '${material.kind}': ${materialType}`)
      }

      // Usar 'title' para o título
      materialTitle = material.title || material.name || material.description || `Material ${index + 1}`

      // Usar 'value' para a URL
      materialUrl = material.value || material.url || material.link || material.href || ""

      console.log(`Material ${index} mapping:`)
      console.log(`  - kind: ${material.kind} -> type: ${materialType}`)
      console.log(`  - title: ${material.title} -> title: ${materialTitle}`)
      console.log(`  - value: ${material.value} -> url: ${materialUrl}`)

      const transformedMaterial = {
        title: materialTitle,
        type: materialType,
        url: materialUrl,
      }

      console.log(`✅ Transformed material ${index} in ${context}:`, JSON.stringify(transformedMaterial, null, 2))
      return transformedMaterial
    })
    .filter((material) => material.url && material.title) // Only return materials with both URL and title

  console.log(`=== FINAL TRANSFORMED MATERIALS (${context}) ===`)
  console.log(`Total materials: ${transformedMaterials.length}`)
  console.log(JSON.stringify(transformedMaterials, null, 2))

  return transformedMaterials
}

export async function fetchCourseById(id: string): Promise<Course | null> {
  const courses = await fetchCourses()
  return courses.find((course) => course.id === id) || null
}
