import type { FC } from 'react'

export const WelcomePanel: FC = () => {
  return (
    <section className='flex flex-1 items-center justify-center px-4 py-6 sm:px-6 md:px-10 md:py-10'>
      <div className='w-full max-w-3xl space-y-10 text-left'>
        <div className='space-y-3 text-balance'>
          <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Redpill Chat</p>
          <h1 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>Welcome back.</h1>
          <p className='max-w-xl text-base text-muted-foreground sm:text-lg'>
            Spin up a new conversation, adjust the model in settings, or verify outputs in real time. Everything stays private to your workspace.
          </p>
        </div>

        <div className='grid gap-4 text-sm text-muted-foreground sm:grid-cols-2'>
          <div className='rounded-lg bg-muted p-4'>
            <h2 className='text-base font-medium text-foreground'>Start chatting</h2>
            <p className='mt-1 leading-relaxed text-muted-foreground'>Use the composer to send a message or open past threads from the sidebar.</p>
          </div>
          <div className='rounded-lg bg-muted p-4'>
            <h2 className='text-base font-medium text-foreground'>Tune the model</h2>
            <p className='mt-1 leading-relaxed text-muted-foreground'>Swap providers, tweak prompts, or attach verifiers from the controls on the right.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
