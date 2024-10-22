export const data = Array.from({ length: 100 }, (_, index) => ({
  id: index.toString(),
  name: `Item ${index + 1}`,
  description: `Descrição do item ${index + 1}`,
}));

export default data;