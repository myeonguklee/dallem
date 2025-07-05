describe('POST /api/example', () => {
  it('should return posted data', async () => {
    const res = await fetch('http://localhost:3000/api/example', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foo: 'bar' }),
    });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toEqual({
      message: 'Data created successfully',
      data: { foo: 'bar' },
    });
  });

  it('should handle different request bodies', async () => {
    const testData = { name: '달램', age: 25 };
    const res = await fetch('http://localhost:3000/api/example', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });
    const data = await res.json();
    expect(data.data).toEqual(testData);
  });
});
