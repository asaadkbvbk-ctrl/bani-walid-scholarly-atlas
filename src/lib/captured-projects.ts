export const capturedProjects = [
  {
    "id": "0e142180-6db8-4e43-8544-009c54565525",
    "to": "/projects/0e142180-6db8-4e43-8544-009c54565525",
    "department": "قسم التربية وعلم النفس",
    "title": "أثر الألعاب التعليمية في تنمية مهارات القراءة لدى تلاميذ المرحلة الابتدائية",
    "people": "فاطمة عمر — إشراف: د. سعاد الهادي",
    "year": "2025",
    "summary": "دراسة تجريبية على عينة من تلاميذ الصف الثالث في مدارس بني وليد."
  },
  {
    "id": "443ce1f7-f249-4fec-83e1-3a55a8a8a46b",
    "to": "/projects/443ce1f7-f249-4fec-83e1-3a55a8a8a46b",
    "department": "قسم اللغة الإنجليزية",
    "title": "صعوبات تعلم مهارة المحادثة باللغة الإنجليزية",
    "people": "مريم عبدالله، هدى صالح — إشراف: د. نوري الطاهر",
    "year": "2024",
    "summary": "تحليل للصعوبات التي يواجهها طلاب المرحلة الثانوية مع مقترحات علاجية."
  },
  {
    "id": "4524aff3-7843-4e12-8281-5800d1312702",
    "to": "/projects/4524aff3-7843-4e12-8281-5800d1312702",
    "department": "قسم الحاسوب",
    "title": "نظام ذكي لإدارة الحضور باستخدام التعرف على الوجه",
    "people": "أحمد سالم، محمد علي — إشراف: د. خالد المبروك",
    "year": "2025",
    "summary": "تصميم نظام يعتمد على الرؤية الحاسوبية لتسجيل حضور الطلاب آلياً داخل القاعات الدراسية."
  },
  {
    "id": "5da1928f-3f94-4db7-ace1-72e32d2e8638",
    "to": "/projects/5da1928f-3f94-4db7-ace1-72e32d2e8638",
    "department": "قسم اللغة العربية",
    "title": "الصورة الفنية في شعر الطبيعة الليبي الحديث",
    "people": "عائشة محمد — إشراف: د. عبدالسلام فرج",
    "year": "2024",
    "summary": "قراءة نقدية في نماذج مختارة من شعراء ليبيا المعاصرين."
  }
] as const;

export type ProjectFilters = { q?: string; dept?: string; year?: string; semester?: string; supervisor?: string; student?: string; keywords?: string };
export function filterProjects(filters: ProjectFilters) {
  const contains = (text: string, query?: string) => text.toLocaleLowerCase().includes((query ?? "").trim().toLocaleLowerCase());
  return capturedProjects.filter(p => (!filters.dept || p.department === filters.dept) && (!filters.year || p.year === filters.year) && !filters.semester && contains(`${p.title} ${p.people} ${p.department} ${p.summary}`, filters.q) && contains(p.people.split(" — ")[1] ?? "", filters.supervisor) && contains(p.people.split(" — ")[0] ?? "", filters.student) && contains(`${p.title} ${p.summary}`, filters.keywords));
}
