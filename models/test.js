let miString = 'visita la web de nube colectiva';
console.log(miString.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))));