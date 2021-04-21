const addRemote = (a: number, b: number) => new Promise(resolve => {
  setTimeout(() => resolve(a + b), 100)
})

async function add(...inputs: number[]) {
  return new Promise((resolve) => resolve(inputs.reduce(async (res: unknown, item) => addRemote((await res) as number, item), 0)))
}

add(3, 5).then(res => console.log(res))
add(3, 5, 7).then(res => console.log(res))